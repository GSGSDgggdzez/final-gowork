import type { LayoutServerData } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: locals.user
	};
}) satisfies LayoutServerData;
