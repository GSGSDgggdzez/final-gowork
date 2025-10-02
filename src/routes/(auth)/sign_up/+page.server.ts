import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { checkPhoneVerification, startPhoneVerification } from '$lib/server/phone_verification.js';

/**
 * FRONTEND DEVELOPER GUIDE - SIGNUP WITH PHONE VERIFICATION
 * ==========================================================
 * 
 * This implements a 2-step registration flow with phone verification via Twilio SMS.
 * 
 * STEP 1: Initial Registration Form Submission
 * ---------------------------------------------
 * Action: ?/register
 * 
 * Form fields to include:
 * - username (min 4 chars)
 * - email (valid email)
 * - password (min 8 chars)
 * - passwordConfirm (min 8 chars, must match password)
 * - firstName (min 4 chars)
 * - lastName (min 4 chars)
 * - address (min 4 chars)
 * - phonenumber (9 digits, must start with 7, 8, or 9) and should have the country code added
 * - profile (File)
 * - country (optional, defaults to 'Ethiopia')
 * 
 * Response on success:
 * {
 *   success: false,
 *   otpSent: true,
 *   message: "A one-time password has been sent...",
 *   phone: "912345678",
 *   data: {...all form fields}
 * }
 * 
 * What to do:
 * 1. Keep all form data in state
 * 2. Show OTP input field
 * 3. Display message to user
 * 
 * STEP 2: OTP Verification & Account Creation
 * --------------------------------------------
 * Action: ?/verify
 * 
 * Form fields to include:
 * - otp (6 digits from SMS)
 * - ALL fields from step 1 (username, email, password, etc.)
 * 
 * Response on success:
 * {
 *   success: true,
 *   message: "Registration successful! Please check your email...",
 *   userId: "abc123"
 * }
 * 
 * What to do:
 * 1. Redirect to login or dashboard
 * 2. Show success message
 * 
 * ERROR HANDLING:
 * ---------------
 * Both actions return fail() with:
 * - error: string (error message to display)
 * - data: {...} (form data to repopulate form)
 * - errors: {...} (Zod validation errors, if applicable)
 * 
 * Example frontend flow:
 * 1. User fills registration form → Submit to ?/register
 * 2. If otpSent === true → Show OTP input, keep form data
 * 3. User enters OTP → Submit to ?/verify with OTP + all original form data
 * 4. If success === true → Redirect to login
 */

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

export const actions = {
	// STEP 2: Verify OTP and create user account
	verify: async ({ request, locals }) => {
		try {
			const formData = await request.formData();

			const verifySchema = zfd.formData({
				otp: zfd.text(
					z
						.string()
						.regex(/^\d{6}$/, { message: 'OTP must be 6 digits' })
						.min(6)
						.max(6)
				),
				username: zfd.text(
					z.string().min(4, { message: 'Username must be at least 4 characters long' })
				),
				address: zfd.text(
					z.string().min(4, { message: 'Address must be at least 4 characters long' })
				),
				firstName: zfd.text(
					z.string().min(4, { message: 'First name must be at least 4 characters long' })
				),
				lastName: zfd.text(
					z.string().min(4, { message: 'Last name must be at least 4 characters long' })
				),
				email: zfd.text(z.email({ message: 'Please enter a valid email address' })),
				password: zfd.text(
					z.string().min(8, { message: 'Password must be at least 8 characters long' })
				),
				passwordConfirm: zfd.text(
					z.string().min(8, { message: 'Password must be at least 8 characters long' })
				),
				phonenumber: zfd.text(
					z
						.string()
						.regex(/^\d{9}$/, { message: 'Phone number must be 9 digits long' })
						.refine((val) => val.startsWith('7') || val.startsWith('8') || val.startsWith('9'), {
							message: 'Phone number must start with 7, 8, or 9'
						})
				),
				role: zfd.text(z.enum(['buyer', 'provider'])),
				country: zfd.text(z.string().optional().default('Ethiopia'))
			});

			const result = verifySchema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					data: Object.fromEntries(formData),
					errors: z.treeifyError(result.error)
				});
			}

			const { otp, phonenumber, password, passwordConfirm } = result.data;

			if (password !== passwordConfirm) {
				return fail(400, {
					error: 'Passwords do not match',
					data: Object.fromEntries(formData)
				});
			}

			// Verify OTP with Twilio (format: +251XXXXXXXXX)
			const verificationResult = await checkPhoneVerification(`+251${phonenumber}`, otp);

			if (!verificationResult.success) {
				return fail(400, {
					error: verificationResult.message,
					data: Object.fromEntries(formData)
				});
			}

			// Create user in PocketBase
			const userData = {
				username: result.data.username,
				email: result.data.email,
				emailVisibility: true,
				password: result.data.password,
				passwordConfirm: result.data.passwordConfirm,
				phone: parseInt(phonenumber),
				country: result.data.country || 'Ethiopia',
				role: [result.data.role],
				first_name: result.data.firstName,
				last_name: result.data.lastName,
				address: result.data.address
			};

			const record = await locals.pb.collection('users').create(userData);
			try {
				await locals.pb.collection('users').requestVerification(result.data.email);
			} catch (e) {
				console.error('Email verification dispatch failed for user', record.id);
				// proceed without failing the whole registration
			}

			return {
				success: true,
				message: 'Registration successful! Please check your email to verify your account.',
				userId: record.id
			};
		} catch (err) {
			console.error('PocketBase user creation error:', err);
			return fail(500, {
				error: 'Failed to create account. Please try again or contact support.'
			});
		}
	},

	// STEP 1: Validate form and send OTP to phone
	register: async ({ request }) => {
		try {
			const formData = await request.formData();

			const registerSchema = zfd.formData({
				username: zfd.text(
					z.string().min(4, { message: 'Username must be at least 4 characters long' })
				),
				address: zfd.text(
					z.string().min(4, { message: 'Address must be at least 4 characters long' })
				),
				firstName: zfd.text(
					z.string().min(4, { message: 'First name must be at least 4 characters long' })
				),
				lastName: zfd.text(
					z.string().min(4, { message: 'Last name must be at least 4 characters long' })
				),
				email: zfd.text(z.email({ message: 'Please enter a valid email address' })),
				password: zfd.text(
					z.string().min(8, { message: 'Password must be at least 8 characters long' })
				),
				passwordConfirm: zfd.text(
					z.string().min(8, { message: 'Password must be at least 8 characters long' })
				),
				phonenumber: zfd.text(
					z
						.string()
						.regex(/^\d{9}$/, { message: 'Phone number must be 9 digits long' })
						.refine((val) => val.startsWith('7') || val.startsWith('8') || val.startsWith('9'), {
							message: 'Phone number must start with 7, 8, or 9'
						})
				),
				role: zfd.text(z.enum(['buyer', 'provider'])),
				profile: zfd.file(z.instanceof(File))
			});

			const result = registerSchema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					data: Object.fromEntries(formData),
					errors: z.treeifyError(result.error)
				});
			}

			const { password, passwordConfirm, phonenumber } = result.data;

			if (password !== passwordConfirm) {
				return fail(400, {
					error: 'Passwords do not match',
					data: Object.fromEntries(formData)
				});
			}

			// Send OTP via Twilio (format: +251XXXXXXXXX)
			const phoneVerification = await startPhoneVerification(phonenumber);

			if (phoneVerification.success) {
				return {
					success: false,
					otpSent: true,
					message:
						'A one-time password has been sent to your phone. Please enter it to complete registration.',
					phone: phonenumber,
					data: Object.fromEntries(formData)
				};
			} else {
				return fail(400, {
					error: 'Phone verification failed. Please check your phone number and try again.',
					data: Object.fromEntries(formData)
				});
			}
		} catch (err) {
			console.error('Registration error:', err);
			return fail(500, {
				error: 'An error occurred during registration. Please try again.'
			});
		}
	}
};
