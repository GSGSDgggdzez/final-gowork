import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

/**
 * FRONTEND DEVELOPER GUIDE - CONFIRM PASSWORD RESET
 * ==================================================
 *
 * This implements the password reset confirmation step after user clicks
 * the reset link in their email.
 *
 * PASSWORD RESET CONFIRMATION FLOW:
 * ----------------------------------
 * Action: ?/confirmPasswordReset
 *
 * Form fields to include:
 * - token (string - extracted from URL query parameter sent via email) example {APP_URL}confirm_password_reset/{TOKEN}
 * - password (min 8 chars, max 100 chars)
 * - confirmPassword (min 8 chars, max 100 chars, must match password)
 *
 * Response on success:
 * {
 *   success: true,
 *   message: "Your password has been reset successfully"
 * }
 *
 * What to do:
 * 1. Extract token from URL query parameters (e.g., ?token=abc123...)
 * 2. Include token as hidden field in the form
 * 3. User enters new password twice
 * 4. Submit to ?/confirmPasswordReset
 * 5. On success, redirect to login page with success message
 *
 * ERROR HANDLING:
 * ---------------
 * Returns fail() with:
 * - error: string (error message to display)
 * - errors: {...} (Zod validation errors, if applicable)
 *
 * Common error messages:
 * - "Passwords do not match"
 * - "Password must be between 8 and 100 characters"
 * - Token expired or invalid errors from PocketBase
 *
 * Example frontend flow:
 * 1. User clicks reset link in email → Redirected to this page with token in URL
 * 2. Extract token from URL query params
 * 3. User enters new password twice → Submit to ?/confirmPasswordReset with token
 * 4. If success === true → Redirect to login with success message
 */

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

export const actions = {
  confirmPasswordReset: async ({ request, locals }) => {
    try {
      const formData = await request.formData();

      const confirmPasswordResetSchema = zfd.formData({
        password: zfd.text(z.string().min(8, { message: 'Password must be between 8 and 100 characters' }).max(100)),
        confirmPassword: zfd.text(z.string().min(8, { message: 'Please confirm your password' }).max(100)),
        token: zfd.text(z.string())
      });

      const result = confirmPasswordResetSchema.safeParse(formData);
      if (!result.success) {
        return fail(400, {
          errors: z.treeifyError(result.error)
        });
      }

      const { password, confirmPassword, token } = result.data;
      if (password !== confirmPassword) {
        return fail(400, { error: 'Passwords do not match' });
      }

      try {
        await locals.pb.collection('users').confirmPasswordReset(token, password, confirmPassword);
      } catch (e) {
        const err = e as { status?: number; message?: string };
        if (err?.status === 400 || err?.status === 404) {
          return fail(400, { error: 'Invalid or expired reset token. Please request a new password reset link.' });
        }
        return fail(500, { error: 'Password reset failed. Please try again.' });
      }

      throw redirect(303, '/login?reset=success');
    } catch (err) {
      if (err instanceof Response && err.status === 303) {
        throw err;
      }
      console.error('Unexpected error:', err);
      return fail(500, { error: 'An unexpected error occurred. Please try again.' });
    }
  }
};

