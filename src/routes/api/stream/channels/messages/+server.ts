/**
 * FRONTEND DEVELOPER GUIDE - GET CHANNEL MESSAGES (Server-Side Query)
 * ====================================================================
 * 
 * This endpoint retrieves messages from a specific channel via server-side query.
 * 
 * NOTE: In most cases, you should use Stream Chat SDK client-side to fetch messages.
 * This endpoint is useful for:
 * - Server-side rendering (SSR)
 * - Initial message loading
 * - Admin/moderation tools
 * 
 * AUTHENTICATION:
 * ---------------
 * Requires PocketBase authentication (user must be logged in).
 * 
 * REQUEST:
 * --------
 * Method: GET
 * URL: /api/stream/channels/messages?channelId=order-abc123&channelType=messaging&limit=50
 * Query Parameters:
 *   - channelId (required): The channel ID (e.g., 'order-abc123')
 *   - channelType (optional): Channel type (default: 'messaging')
 *   - limit (optional): Number of messages to return (default: 50)
 * 
 * RESPONSE ON SUCCESS (200):
 * --------------------------
 * {
 *   "messages": [
 *     {
 *       "id": "msg_123",
 *       "text": "Hello!",
 *       "user": {
 *         "id": "user_abc",
 *         "name": "John Doe"
 *       },
 *       "created_at": "2025-01-01T12:00:00Z",
 *       "updated_at": "2025-01-01T12:00:00Z",
 *       "type": "regular"
 *     }
 *   ]
 * }
 * 
 * RESPONSE ON ERROR:
 * ------------------
 * 400 Bad Request: Channel ID not provided
 * 401 Unauthorized: User not logged in
 * 500 Internal Server Error: Failed to retrieve messages
 * 
 * FRONTEND USAGE (Recommended - Client-Side):
 * --------------------------------------------
 * // Prefer using Stream SDK client-side for real-time:
 * const channel = streamClient.channel('messaging', 'order-abc123');
 * await channel.watch();
 * const messages = channel.state.messages;
 * 
 * FRONTEND USAGE (Server-Side Query):
 * ------------------------------------
 * // Only use this for SSR or initial load:
 * const response = await fetch('/api/stream/channels/messages?channelId=order-abc123&limit=50');
 * const { messages } = await response.json();
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getChannelMessages } from '$lib/server/stream-chat';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.pb?.authStore?.record) {
		throw error(401, 'Unauthorized');
	}

	const channelType = url.searchParams.get('channelType') || 'messaging';
	const channelId = url.searchParams.get('channelId');
	const limit = parseInt(url.searchParams.get('limit') || '50');

	if (!channelId) {
		throw error(400, 'Channel ID is required');
	}

	try {
		const messages = await getChannelMessages(channelType, channelId, limit);

		return json({ messages });
	} catch (err) {
		console.error('Get messages error:', err);
		throw error(500, 'Failed to retrieve messages');
	}
};
