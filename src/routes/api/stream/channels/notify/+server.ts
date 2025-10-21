/**
 * FRONTEND DEVELOPER GUIDE - SEND SYSTEM NOTIFICATION
 * ====================================================
 * 
 * This endpoint sends a system message/notification to a channel.
 * System messages are typically automated notifications about order status, events, etc.
 * 
 * NOTE: This is typically used server-side or for admin actions.
 * Regular user messages should be sent using Stream Chat SDK client-side.
 * 
 * AUTHENTICATION:
 * ---------------
 * Requires PocketBase authentication (user must be logged in).
 * 
 * REQUEST:
 * --------
 * Method: POST
 * URL: /api/stream/channels/notify
 * Headers:
 *   - Content-Type: application/json
 *   - Cookie: pb_auth (automatic)
 * Body:
 * {
 *   "channelType": "messaging",
 *   "channelId": "order-abc123",
 *   "message": "Order has been delivered!"
 * }
 * 
 * RESPONSE ON SUCCESS (200):
 * --------------------------
 * {
 *   "success": true
 * }
 * 
 * RESPONSE ON ERROR:
 * ------------------
 * 400 Bad Request: Missing required fields (channelType, channelId, message)
 * 401 Unauthorized: User not logged in
 * 500 Internal Server Error: Failed to send message
 * 
 * FRONTEND USAGE:
 * ---------------
 * // Rarely needed on client-side. Example:
 * const response = await fetch('/api/stream/channels/notify', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     channelType: 'messaging',
 *     channelId: 'order-abc123',
 *     message: '✅ Payment received!'
 *   })
 * });
 * 
 * WHEN TO USE:
 * ------------
 * - Admin notifications
 * - Automated system alerts
 * - Order status updates (handled automatically by PocketBase hooks)
 * 
 * NOTE:
 * -----
 * Most system notifications are sent automatically by PocketBase hooks
 * (see src/lib/server/pocketbase-hooks.ts). Manual calls rarely needed.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendSystemMessage } from '$lib/server/stream-chat';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.pb?.authStore?.record) {
		throw error(401, 'Unauthorized');
	}

	const user = locals.pb.authStore.record;

	try {
		const { channelType, channelId, message } = await request.json();

		if (!channelType || !channelId || !message) {
			throw error(400, 'Channel type, ID, and message are required');
		}

		await sendSystemMessage(channelType, channelId, message, user.id);

		return json({ success: true });
	} catch (err: any) {
		console.error('Send system message error:', err);
		throw error(err.status || 500, err.message || 'Failed to send system message');
	}
};
