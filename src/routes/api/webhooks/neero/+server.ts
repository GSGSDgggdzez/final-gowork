/**
 * Neero Gateway Webhook Handler
 * Processes payment callbacks from Neero Gateway
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { NeeroGatewayClient } from '$lib/server/payment/neero-client';
import { EscrowService } from '$lib/server/payment/escrow-service';
import { env } from '$env/dynamic/private';

const neeroClient = new NeeroGatewayClient({
	apiKey: env.NEERO_API_KEY || '',
	merchantId: env.NEERO_MERCHANT_ID || '',
	baseUrl: env.NEERO_BASE_URL || 'https://api.neero.com',
	webhookSecret: env.NEERO_WEBHOOK_SECRET || ''
});

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const rawBody = await request.text();
		const signature = request.headers.get('x-neero-signature');

		if (!signature) {
			throw error(401, 'Missing webhook signature');
		}

		const isValid = neeroClient.verifyWebhookSignature(rawBody, signature);

		if (!isValid) {
			throw error(401, 'Invalid webhook signature');
		}

		const payload = JSON.parse(rawBody);
		const escrowService = new EscrowService(locals.pb, neeroClient);

		switch (payload.event) {
			case 'payment.completed':
				await handlePaymentCompleted(escrowService, payload);
				break;

			case 'payment.failed':
				await handlePaymentFailed(locals.pb, payload);
				break;

			case 'transfer.completed':
				await handleTransferCompleted(locals.pb, payload);
				break;

			case 'transfer.failed':
				await handleTransferFailed(locals.pb, payload);
				break;

			default:
				console.log(`Unhandled webhook event: ${payload.event}`);
		}

		return json({ success: true });
	} catch (err) {
		console.error('Webhook processing error:', err);
		throw error(500, 'Webhook processing failed');
	}
};

async function handlePaymentCompleted(escrowService: EscrowService, payload: any) {
	const result = await escrowService.handlePaymentCompleted(payload.transactionId);

	console.log('Payment completed:', {
		transactionId: payload.transactionId,
		amount: payload.amount,
		currency: payload.currency,
		result
	});

	// TODO: Send notification to buyer and provider
	// - Notify buyer payment successful
	// - Notify provider work can begin
}

async function handlePaymentFailed(pb: any, payload: any) {
	try {
		const payment = await pb.collection('payments').getFirstListItem(
			`payment_gateway_ref = "${payload.transactionId}"`
		);

		await pb.collection('payments').update(payment.id, {
			status: 'failed'
		});

		console.log('Payment failed:', {
			transactionId: payload.transactionId,
			paymentId: payment.id
		});

		// TODO: Send notification to buyer
		// - Notify buyer payment failed
		// - Provide retry option
	} catch (error) {
		console.error('Error handling payment failure:', error);
	}
}

async function handleTransferCompleted(pb: any, payload: any) {
	console.log('Transfer to provider completed:', {
		transactionId: payload.transactionId,
		amount: payload.amount
	});

	// TODO: Send notification to provider
	// - Notify provider payment released
	// - Update provider balance/wallet
}

async function handleTransferFailed(pb: any, payload: any) {
	console.error('Transfer to provider failed:', {
		transactionId: payload.transactionId,
		error: payload.error
	});

	// TODO: Handle transfer failure
	// - Log for manual review
	// - Retry transfer
	// - Notify support team
}
