/**
 * Release Payment to Provider Endpoint
 * POST /api/payments/release
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

		const { orderId, milestoneNumber } = body;

		if (!orderId) {
			throw error(400, 'Order ID is required');
		}

		const order = await locals.pb.collection('orders').getOne(orderId);

		if (order.buyer_id !== userId) {
			throw error(403, 'Only the buyer can release payment');
		}

		if (order.status !== 'delivered') {
			throw error(400, 'Order must be delivered before releasing payment');
		}

		if (!order.escrow_funded) {
			throw error(400, 'Order escrow not funded');
		}

		const escrowService = new EscrowService(locals.pb, neeroClient);

		const result = await escrowService.releasePayment(orderId, milestoneNumber);

		return json(result);
	} catch (err: any) {
		console.error('Payment release error:', err);
		throw error(err.status || 500, err.message || 'Payment release failed');
	}
};
