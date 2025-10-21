/**
 * Initiate Second Milestone Payment Endpoint
 * POST /api/payments/milestone
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

		const order = await locals.pb.collection('orders').getOne(orderId);

		if (order.buyer_id !== userId) {
			throw error(403, 'Only the buyer can initiate payment');
		}

		const metadata = order.metadata as any;

		if (!metadata?.milestones || metadata.milestones.length < 2) {
			throw error(400, 'Order does not have milestone payments');
		}

		const firstMilestone = metadata.milestones[0];
		if (firstMilestone.status !== 'paid') {
			throw error(400, 'First milestone must be paid before second milestone');
		}

		const escrowService = new EscrowService(locals.pb, neeroClient);
		const returnUrl = `${url.origin}/orders/${orderId}/payment`;

		const result = await escrowService.initiateSecondMilestone(orderId, returnUrl);

		return json(result);
	} catch (err: any) {
		console.error('Milestone payment initiation error:', err);
		throw error(err.status || 500, err.message || 'Milestone payment initiation failed');
	}
};
