import type { TypedPocketBase } from '../../pocketbase-types';
import { getOrCreateConversationChannel, sendSystemMessage } from './stream-chat';

export async function setupPocketBaseHooks(pb: TypedPocketBase) {
	pb.collection('orders').subscribe('*', async (e) => {
		if (e.action === 'create') {
			const order = e.record;
			const buyerId = Array.isArray(order.buyer_id) ? order.buyer_id[0] : order.buyer_id;
			const providerId = Array.isArray(order.provider_id)
				? order.provider_id[0]
				: order.provider_id;

			try {
				const streamChannel = await getOrCreateConversationChannel(
					buyerId,
					providerId,
					order.id
				);

				await pb.collection('conversations').create({
					order_id: order.id,
					getstream_channel_id: streamChannel.cid,
					participants: streamChannel.members
				});

				await sendSystemMessage(
					'messaging',
					streamChannel.channelId,
					`Order #${order.id} has been created. Let's discuss the details!`,
					buyerId
				);
			} catch (error) {
				console.error('Failed to create conversation for order:', error);
			}
		}

		if (e.action === 'update') {
			const order = e.record;

			try {
				const conversation = await pb
					.collection('conversations')
					.getFirstListItem(`order_id="${order.id}"`);

				const channelId = `order-${order.id}`;
				const buyerId = Array.isArray(order.buyer_id) ? order.buyer_id[0] : order.buyer_id;

				let message = '';
				switch (order.status) {
					case 'delivered':
						message = '✅ Provider has delivered the work. Please review and approve.';
						break;
					case 'completed':
						message = '🎉 Order has been completed successfully!';
						break;
					case 'cancelled':
						message = '❌ Order has been cancelled.';
						break;
					case 'disputed':
						message = '⚠️ Order is under dispute. Support will contact you shortly.';
						break;
				}

				if (message) {
					await sendSystemMessage('messaging', channelId, message, buyerId);
				}
			} catch (error) {
				console.error('Failed to send status update message:', error);
			}
		}
	});

	pb.collection('proposals').subscribe('*', async (e) => {
		if (e.action === 'update' && e.record.status === 'accepted') {
			const proposal = e.record;

			try {
				const jobId = Array.isArray(proposal.job_id) ? proposal.job_id[0] : proposal.job_id;
				const providerId = Array.isArray(proposal.provider_id)
					? proposal.provider_id[0]
					: proposal.provider_id;

				const job = await pb.collection('jobs').getOne(jobId);
				const buyerId = job.buyer_id;

				const order = await pb.collection('orders').create({
					job_id: [jobId],
					buyer_id: buyerId,
					provider_id: [providerId],
					agreed_price: proposal.proposed_price,
					currency: proposal.currency,
					status: 'active',
					escrow_funded: false
				});

				const streamChannel = await getOrCreateConversationChannel(buyerId, providerId, order.id);

				await pb.collection('conversations').create({
					order_id: order.id,
					getstream_channel_id: streamChannel.cid,
					participants: streamChannel.members
				});

				await sendSystemMessage(
					'messaging',
					streamChannel.channelId,
					`🎉 Proposal accepted! Order #${order.id} has been created.`,
					buyerId
				);
			} catch (error) {
				console.error('Failed to create order conversation:', error);
			}
		}
	});

	console.log('PocketBase hooks initialized');
}
