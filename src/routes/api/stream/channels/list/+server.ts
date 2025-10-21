/**
 * FRONTEND DEVELOPER GUIDE - LIST USER CHANNELS
 * ==============================================
 * 
 * This endpoint retrieves all chat channels for the authenticated user.
 * Returns channels sorted by most recent message.
 * 
 * AUTHENTICATION:
 * ---------------
 * Requires PocketBase authentication (user must be logged in).
 * 
 * REQUEST:
 * --------
 * Method: GET
 * URL: /api/stream/channels/list?limit=20
 * Query Parameters:
 *   - limit (optional): Number of channels to return (default: 20)
 * 
 * RESPONSE ON SUCCESS (200):
 * --------------------------
 * {
 *   "channels": [
 *     {
 *       "id": "order-abc123",
 *       "cid": "messaging:order-abc123",
 *       "type": "messaging",
 *       "data": {
 *         "name": "Order #abc123",
 *         "order_id": "abc123",
 *         "created_by_id": "user_buyer"
 *       },
 *       "state": {
 *         "members": {
 *           "user_buyer": { "user_id": "user_buyer", ... },
 *           "user_provider": { "user_id": "user_provider", ... }
 *         },
 *         "messages": [...recent messages...],
 *         "read": {...read state...},
 *         "unreadCount": 5
 *       },
 *       "lastMessageAt": "2025-01-01T12:00:00Z"
 *     }
 *   ]
 * }
 * 
 * RESPONSE ON ERROR:
 * ------------------
 * 401 Unauthorized: User not logged in
 * 500 Internal Server Error: Failed to retrieve channels
 * 
 * FRONTEND USAGE:
 * ---------------
 * Display list of conversations in inbox/messages page:
 * 
 * const response = await fetch('/api/stream/channels/list?limit=20');
 * const { channels } = await response.json();
 * 
 * channels.forEach(channel => {
 *   console.log(`Channel: ${channel.id}`);
 *   console.log(`Unread: ${channel.state.unreadCount}`);
 *   console.log(`Last message: ${channel.lastMessageAt}`);
 * });
 * 
 * WHEN TO CALL:
 * -------------
 * - On messages/inbox page load
 * - To display conversation list
 * - To show unread message counts
 * - For notifications badge
 * 
 * NOTE:
 * -----
 * For real-time updates, use Stream Chat SDK client-side channel queries
 * with event listeners. This endpoint is for initial load only.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { queryUserChannels } from '$lib/server/stream-chat';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.pb?.authStore?.record) {
		throw error(401, 'Unauthorized');
	}

	const user = locals.pb.authStore.record;
	const limit = parseInt(url.searchParams.get('limit') || '20');

	try {
		const channels = await queryUserChannels(user.id, limit);

		return json({
			channels: channels.map((channel) => ({
				id: channel.id,
				cid: channel.cid,
				type: channel.type,
				data: channel.data,
				state: {
					members: channel.state.members,
					messages: channel.state.messages,
					read: channel.state.read,
					unreadCount: channel.countUnread()
				},
				lastMessageAt: channel.state.last_message_at
			}))
		});
	} catch (err) {
		console.error('Channel list error:', err);
		throw error(500, 'Failed to retrieve channels');
	}
};
