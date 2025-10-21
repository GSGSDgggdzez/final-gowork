/**
 * FRONTEND DEVELOPER GUIDE - STREAM CHAT TOKEN GENERATION
 * ========================================================
 * 
 * This endpoint generates a Stream Chat authentication token for the logged-in user.
 * 
 * AUTHENTICATION:
 * ---------------
 * Requires PocketBase authentication (user must be logged in via hooks.server.ts).
 * The endpoint automatically reads user data from locals.pb.authStore.
 * 
 * REQUEST:
 * --------
 * Method: POST
 * URL: /api/stream/token
 * Headers: Cookie with pb_auth (automatically sent by browser)
 * Body: None required
 * 
 * RESPONSE ON SUCCESS (200):
 * --------------------------
 * {
 *   "userId": "user_abc123",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * 
 * RESPONSE ON ERROR:
 * ------------------
 * 401 Unauthorized: User not logged in
 * 500 Internal Server Error: Stream token generation failed
 * 
 * FRONTEND USAGE:
 * ---------------
 * Call this endpoint when initializing the Stream Chat client:
 * 
 * const response = await fetch('/api/stream/token', { method: 'POST' });
 * const { userId, token } = await response.json();
 * 
 * // Then use with Stream Chat SDK:
 * import { StreamChat } from 'stream-chat';
 * const client = StreamChat.getInstance('YOUR_STREAM_API_KEY');
 * await client.connectUser({ id: userId }, token);
 * 
 * WHEN TO CALL:
 * -------------
 * - On app initialization (if user is logged in)
 * - After successful login
 * - When Stream token expires (automatic reconnection)
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createOrGetUser } from '$lib/server/stream-chat';

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.pb?.authStore?.record) {
		throw error(401, 'Unauthorized');
	}

	const user = locals.pb.authStore.record;

	try {
		const streamUser = await createOrGetUser(user.id, {
			name: `${user.first_name} ${user.last_name}`,
			email: user.email,
			avatar: user.avatar,
			role: user.role
		});

		return json({
			userId: streamUser.userId,
			token: streamUser.token
		});
	} catch (err) {
		console.error('Stream token generation error:', err);
		throw error(500, 'Failed to generate Stream token');
	}
};
