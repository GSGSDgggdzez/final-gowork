import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

/**
 * FRONTEND DEVELOPER GUIDE - FORGOT PASSWORD
 * ===========================================
 *
 * This implements password reset request functionality via email.
 *
 * PASSWORD RESET FLOW:
 * --------------------
 * Action: ?/forgotPassword
 *
 * Form fields to include:
 * - email (valid email)
 *
 * Response on success:
 * {
 *   success: true,
 *   message: "If an account with that email exists, a password reset link has been sent."
 * }
 *
 * What to do:
 * 1. Show success message to user
 * 2. Instruct user to check their email inbox
 * 3. The email will contain a link to reset their password
 *
 * ERROR HANDLING:
 * ---------------
 * Returns fail() with:
 * - error: string (error message to display)
 * - errors: {...} (Zod validation errors, if applicable)
 *
 * Security Note:
 * - For security reasons, we return the same success message whether
 *   the email exists or not to prevent email enumeration attacks
 *
 * Example frontend flow:
 * 1. User enters email → Submit to ?/forgotPassword
 * 2. Show success message regardless of whether email exists
 * 3. If email exists, user receives password reset link via email
 * 4. User clicks link in email to reset password on PocketBase hosted page
 */

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

export const actions = {
    forgotPassword: async ({ request, locals }) => {
        try {
            const formData = await request.formData();

            const forgotPasswordSchema = zfd.formData({
                email: zfd.text(z.email({ message: 'Please enter a valid email address' }))
            });

            const result = forgotPasswordSchema.safeParse(formData);
            if (!result.success) {
                return fail(400, {
                    errors: z.treeifyError(result.error)
                });
            }

            const { email } = result.data;

            try {
              await locals.pb.collection('users').requestPasswordReset(email);
            } catch (err: unknown) {
              console.error('Forgot Password error:', err);
              // Intentionally swallow specific errors to prevent email enumeration
              // We still proceed to return the same success message below.
            }

            return {
              success: true,
              message: 'If an account with that email exists, a password reset link has been sent.'
            };

        }catch (err) {
            if (err instanceof Response && err.status === 303) {
				throw err;
			}

			console.error('Unexpected error:', err);
			return fail(500, {
				error: 'An unexpected error occurred. Please try again.'
			});
        }
    }
}


