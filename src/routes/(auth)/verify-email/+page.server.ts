import { fail, redirect } from '@sveltejs/kit';

/**
 * FRONTEND DEVELOPER GUIDE - EMAIL VERIFICATION
 * ==============================================
 *
 * This implements email verification after user clicks the verification
 * link sent to their email during registration.
 *
 * EMAIL VERIFICATION FLOW:
 * ------------------------
 * This page is loaded when user clicks verification link from email.
 * The token is extracted from URL query parameters and verified automatically.
 *
 * URL format: /verify_email/{TOKEN}
 *
 * Response on success:
 * - Redirects to login page with success message
 * - User can now log in with verified account
 *
 * Response on failure:
 * - Shows error message (invalid/expired token)
 * - User may need to request new verification email
 *
 * ERROR HANDLING:
 * ---------------
 * Returns fail() with:
 * - error: string (error message to display)
 *
 * Common error messages:
 * - "Invalid or expired verification token"
 * - "Email verification failed. Please try again."
 * - "Missing verification token"
 *
 * Example frontend flow:
 * 1. User receives email with verification link
 * 2. User clicks link → Redirected to /verify_email/abc123...
 * 3. Page automatically verifies token on load
 * 4. If success → Redirect to login with "Email verified successfully" message
 * 5. If error → Show error message with option to resend verification email
 *
 * NOTE: This route expects the file structure to be:
 * /src/routes/(auth)/verify_email/[token]/+page.server.ts
 */

// Move this file to: src/routes/(auth)/verify_email/[token]/+page.server.ts
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const token = params.token;

	if (!token) {
		return fail(400, {
			error: 'Missing verification token. Please check your email for the correct link.'
		});
	}

	try {
		await locals.pb.collection('users').confirmVerification(token);
		throw redirect(303, '/login?verified=true');
	} catch (err) {
		if (err instanceof Response && err.status === 303) {
			throw err;
		}
		console.error('Email verification error:', err);
		const error = err as { status?: number; message?: string };
		if (error?.status === 400 || error?.status === 404) {
			return fail(400, {
				error: 'Invalid or expired verification token. Please request a new verification email.'
			});
		}
		return fail(500, {
			error: 'Email verification failed. Please try again or contact support.'
		});
	}
}

