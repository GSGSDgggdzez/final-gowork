/**
 * HOOKS.SERVER.TS - Authentication & Global Middleware
 * =====================================================
 * 
 * This file handles PocketBase authentication for the entire application.
 * It runs on every request before any +page.server.ts or +server.ts files.
 * 
 * AUTHENTICATION FLOW:
 * --------------------
 * 1. Reads pb_auth cookie from incoming request
 * 2. Loads auth state into PocketBase client
 * 3. Validates and refreshes token if needed
 * 4. Stores user in locals.user (available to all routes)
 * 5. Returns updated cookie to client
 * 
 * AVAILABLE IN ALL ROUTES:
 * ------------------------
 * - locals.pb: PocketBase client instance
 * - locals.user: Current authenticated user (or undefined)
 * 
 * STREAM CHAT INTEGRATION:
 * ------------------------
 * Stream Chat authentication is handled separately via /api/stream/token
 * after PocketBase authentication is confirmed. The token endpoint uses
 * locals.pb.authStore.record to get the current user.
 * 
 * Frontend flow:
 * 1. User logs in → PocketBase sets pb_auth cookie
 * 2. Every request → This hook validates pb_auth
 * 3. User data available in locals.user for all routes
 * 4. Frontend fetches Stream token from /api/stream/token
 * 5. Frontend connects to Stream Chat with token
 */

import PocketBase, { type AuthRecord } from 'pocketbase';
import { serializeNonPOJOs } from '$lib';
import { PUBLIC_pocketbase_URL } from '$env/static/public';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(PUBLIC_pocketbase_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
		event.locals.user = event.locals.pb.authStore.record
			? (serializeNonPOJOs(event.locals.pb.authStore.record) as AuthRecord)
			: undefined;
	} catch (err) {
		// clear the auth store on failed refresh
		console.error('Auth refresh failed:', err);
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	// todo Set proper middleware
	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}
