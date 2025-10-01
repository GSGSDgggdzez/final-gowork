import type { LayoutServerData } from './$types';

export const load = (async ({ locals }: { locals: { user: any } }) => {
    if (locals.user) {
		return {
			user: locals.user
		};
	}
    return {
        user: undefined
    };
}) satisfies LayoutServerData;
