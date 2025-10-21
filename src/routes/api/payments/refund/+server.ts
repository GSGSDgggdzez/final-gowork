/**
 * Refund Payment Endpoint
 * POST /api/payments/refund
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
		if (!locals.pb.authStore.isValid) {
			throw error(401, 'Unauthorized');
		}

		const userId = locals.pb.authStore.model?.id;
		const body = await request.json();

		const { orderId, reason } = body;

		if (!orderId || !reason) {
			throw error(400, 'Order ID and reason are required');
		}

		const order = await locals.pb.collection('orders').getOne(orderId);

		if (order.buyer_id !== userId && order.provider_id[0] !== userId) {
			throw error(403, 'Only buyer or provider can request refund');
		}

		if (!['cancelled', 'disputed'].includes(order.status)) {
			throw error(400, 'Order must be cancelled or disputed for refund');
		}

		const escrowService = new EscrowService(locals.pb, neeroClient);

		const result = await escrowService.refundPayment(orderId, reason);

		return json(result);
	} catch (err: any) {
		console.error('Refund error:', err);
		throw error(err.status || 500, err.message || 'Refund failed');
	}
};
