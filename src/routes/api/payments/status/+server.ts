/**
 * Check Payment Status Endpoint
 * GET /api/payments/status?orderId=xxx
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	try {
		if (!locals.pb.authStore.isValid) {
			throw error(401, 'Unauthorized');
		}

		const userId = locals.pb.authStore.model?.id;
		const orderId = url.searchParams.get('orderId');

		if (!orderId) {
			throw error(400, 'Order ID is required');
		}

		const order = await locals.pb.collection('orders').getOne(orderId);

		if (order.buyer_id !== userId && order.provider_id[0] !== userId) {
			throw error(403, 'Not authorized to view this order');
		}

		const payments = await locals.pb.collection('payments').getFullList({
			filter: `order_id = "${orderId}"`,
			sort: '-created'
		});

		const metadata = order.metadata as any;

		return json({
			orderId: order.id,
			orderStatus: order.status,
			agreedPrice: order.agreed_price,
			currency: order.currency,
			escrowFunded: order.escrow_funded,
			milestones: metadata?.milestones || null,
			payments: payments.map((p) => ({
				id: p.id,
				amount: p.amount,
				commission: p.commission,
				status: p.status,
				transactionId: p.payment_gateway_ref,
				createdAt: p.created,
				updatedAt: p.updated
			}))
		});
	} catch (err: any) {
		console.error('Payment status check error:', err);
		throw error(err.status || 500, err.message || 'Failed to fetch payment status');
	}
};
