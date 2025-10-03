// src/hooks.server.ts
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
