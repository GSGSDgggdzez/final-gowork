import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

/**
 * FRONTEND DEVELOPER GUIDE - LOGIN
 * =================================
 *
 * This implements email/password authentication with PocketBase.
 *
 * LOGIN FLOW:
 * -----------
 * Action: ?/login
 *
 * Form fields to include:
 * - email (valid email)
 * - password (min 8 chars)
 *
 * Response on success:
 * - Redirects to dashboard or home page
 * - Session cookie is automatically set by PocketBase
 *
 * ERROR HANDLING:
 * ---------------
 * Returns fail() with:
 * - error: string (error message to display)
 * - errors: {...} (Zod validation errors, if applicable)
 *
 * Common error messages:
 * - "Invalid email or password"
 * - "Please verify your email before logging in"
 * - Validation errors for email/password format
 */

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

export const actions = {
	login: async ({ request, locals }) => {
		try {
			const formData = await request.formData();

			const loginSchema = zfd.formData({
				email: zfd.text(z.email({ message: 'Please enter a valid email address' })),
				password: zfd.text(
					z.string().min(8, { message: 'Password must be at least 8 characters long' })
				)
			});

			const result = loginSchema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					errors: z.treeifyError(result.error)
				});
			}

			const { email, password } = result.data;

			try {
			  await locals.pb.collection('users').authWithPassword(email, password);
			} catch (err: unknown) {
			  console.error('Login error:', err);
			  // Normalize to prevent user enumeration
			  return fail(400, { error: 'Invalid email or password' });
			}

			if (!locals.pb.authStore.record?.verified) {
			  // Clear and normalize response to avoid leaking existence
			  locals.pb.authStore.clear();
			  return fail(400, { error: 'Invalid email or password' });
			}

			throw redirect(303, '/');

			throw redirect(303, '/');
		} catch (err) {
			if (err instanceof Response && err.status === 303) {
				throw err;
			}

			console.error('Unexpected login error:', err);
			return fail(500, {
				error: 'An unexpected error occurred. Please try again.'
			});
		}
	}
};