/**
 * FRONTEND DEVELOPER GUIDE - CREATE STREAM CHAT CHANNEL
 * ======================================================
 * 
 * This endpoint creates or retrieves a conversation channel for an order.
 * Automatically creates a PocketBase conversation record and syncs with Stream Chat.
 * 
 * AUTHENTICATION:
 * ---------------
 * Requires PocketBase authentication (user must be logged in).
 * User must be either the buyer or provider of the specified order.
 * 
 * REQUEST:
 * --------
 * Method: POST
 * URL: /api/stream/channels/create
 * Headers: 
 *   - Content-Type: application/json
 *   - Cookie: pb_auth (automatic)
 * Body:
 * {
 *   "orderId": "order_abc123"
 * }
 * 
 * RESPONSE ON SUCCESS (200):
 * --------------------------
 * {
 *   "conversation": {
 *     "id": "conv_xyz",
 *     "order_id": "order_abc123",
 *     "getstream_channel_id": "messaging:order-order_abc123",
 *     "participants": ["user_buyer", "user_provider"],
 *     "created": "2025-01-01T12:00:00Z",
 *     "updated": "2025-01-01T12:00:00Z"
 *   },
 *   "channelId": "order-order_abc123",
 *   "cid": "messaging:order-order_abc123"
 * }
 * 
 * RESPONSE ON ERROR:
 * ------------------
 * 400 Bad Request: Order ID not provided
 * 401 Unauthorized: User not logged in
 * 403 Forbidden: User not part of this order
 * 500 Internal Server Error: Channel creation failed
 * 
 * FRONTEND USAGE:
 * ---------------
 * After accepting a proposal or creating an order:
 * 
 * const response = await fetch('/api/stream/channels/create', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ orderId: 'order_abc123' })
 * });
 * const { channelId, cid } = await response.json();
 * 
 * // Then connect to the channel:
 * const channel = streamClient.channel('messaging', channelId);
 * await channel.watch();
 * 
 * CHANNEL NAMING:
 * ---------------
 * - Channel Type: 'messaging'
 * - Channel ID: 'order-{orderId}'
 * - CID: 'messaging:order-{orderId}'
 * 
 * WHEN TO CALL:
 * -------------
 * - After order is created
 * - When user navigates to order details/chat
 * - After proposal acceptance
 * 
 * NOTE:
 * -----
 * This endpoint is idempotent - calling it multiple times with the same
 * orderId will return the existing conversation.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOrCreateConversationChannel } from '$lib/server/stream-chat';
import type { TypedPocketBase } from '../../../../../pocketbase-types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.pb?.authStore?.record) {
		throw error(401, 'Unauthorized');
	}

	const pb = locals.pb as TypedPocketBase;
	const currentUser = locals.pb.authStore.record;

	try {
		const { orderId } = await request.json();

		if (!orderId) {
			throw error(400, 'Order ID is required');
		}

		const order = await pb.collection('orders').getOne(orderId, {
			expand: 'buyer_id,provider_id'
		});

		const buyerId = Array.isArray(order.buyer_id) ? order.buyer_id[0] : order.buyer_id;
		const providerId = Array.isArray(order.provider_id) ? order.provider_id[0] : order.provider_id;

		if (currentUser.id !== buyerId && currentUser.id !== providerId) {
			throw error(403, 'Not authorized to create this conversation');
		}

		const streamChannel = await getOrCreateConversationChannel(buyerId, providerId, orderId);

		let existingConversation;
		try {
			existingConversation = await pb
				.collection('conversations')
				.getFirstListItem(`order_id="${orderId}"`);
		} catch (err) {
			existingConversation = null;
		}

		let conversation;
		if (existingConversation) {
			conversation = existingConversation;
		} else {
			conversation = await pb.collection('conversations').create({
				order_id: orderId,
				getstream_channel_id: streamChannel.cid,
				participants: streamChannel.members
			});
		}

		return json({
			conversation,
			channelId: streamChannel.channelId,
			cid: streamChannel.cid
		});
	} catch (err: any) {
		console.error('Channel creation error:', err);
		throw error(err.status || 500, err.message || 'Failed to create channel');
	}
};
