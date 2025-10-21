/**
 * Initiate Escrow Payment Endpoint
 * POST /api/payments/initiate
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

export const POST: RequestHandler = async ({ request, locals, url }) => {
	try {
		if (!locals.pb.authStore.isValid) {
			throw error(401, 'Unauthorized');
		}

		const userId = locals.pb.authStore.model?.id;
		const body = await request.json();

		const { orderId } = body;

		if (!orderId) {
			throw error(400, 'Order ID is required');
		}

		const order = await locals.pb.collection('orders').getOne(orderId, {
			expand: 'buyer_id,provider_id,job_id'
		});

		if (order.buyer_id !== userId) {
			throw error(403, 'Only the buyer can initiate payment');
		}

		if (order.escrow_funded) {
			throw error(400, 'Order already funded');
		}

		const escrowService = new EscrowService(locals.pb, neeroClient);

		const returnUrl = `${url.origin}/orders/${orderId}/payment`;

		const result = await escrowService.initiateEscrowPayment({
			orderId: orderId,
			buyerId: order.buyer_id,
			providerId: order.provider_id[0],
			amount: order.agreed_price,
			currency: order.currency,
			description: `Payment for Order ${orderId}`,
			returnUrl: returnUrl
		});

		return json(result);
	} catch (err: any) {
		console.error('Payment initiation error:', err);
		throw error(err.status || 500, err.message || 'Payment initiation failed');
	}
};
