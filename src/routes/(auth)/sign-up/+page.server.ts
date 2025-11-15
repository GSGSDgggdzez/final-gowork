import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { checkPhoneVerification, startPhoneVerification } from '$lib/server/phone_verification.js';
import { checkRateLimit } from '$lib/server/redis.js';

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
 * - phonenumber (9 digits)
 * - countryCode (e.g., "+251" for Ethiopia, "+1" for USA, "+44" for UK)
 * - role ('buyer' or 'provider')
 * - profile (File - max 5MB, only jpg/png/webp)
 * - country (optional, defaults to 'Ethiopia')
 *
 * Response on success:
 * {
 *   success: false,
 *   otpSent: true,
 *   message: "A one-time password has been sent...",
 *   phone: "912345678"
 * }
 *
 * What to do:
 * 1. Keep all form data in state (including countryCode)
 * 2. Show OTP input field
 * 3. Display message to user
 *
 * STEP 2: OTP Verification & Account Creation
 * --------------------------------------------
 * Action: ?/verify
 *
 * Form fields to include:
 * - otp (6 digits from SMS)
 * - ALL fields from step 1 (username, email, password, phonenumber, countryCode, etc.)
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
 * - errors: {...} (Zod validation errors, if applicable)
 *
 * Rate Limiting:
 * - 3 OTP requests per 10 minutes per phone number
 * - 5 verification attempts per 15 minutes per phone number
 * - Returns 429 status with error message when limit exceeded
 *
 * Example frontend flow:
 * 1. User selects country (+251) and fills registration form → Submit to ?/register
 * 2. If otpSent === true → Show OTP input, keep ALL form data including countryCode
 * 3. User enters OTP → Submit to ?/verify with OTP + countryCode + all original form data
 * 4. If success === true → Redirect to login
 */

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

export const actions = {
	// STEP 2: Verify OTP and create user account
	verify: async ({ request, locals, getClientAddress }) => {
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
				),
				countryCode: zfd.text(
					z.string().regex(/^\+\d{1,4}$/, { message: 'Country code must be in format +XXX' })
				),
				role: zfd.text(z.enum(['buyer', 'provider'])),
				country: zfd.text(z.string().default('Cameroon'))
			});

			const result = verifySchema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					errors: z.treeifyError(result.error)
				});
			}

			const { otp, phonenumber, password, passwordConfirm, countryCode } = result.data;

			if (password !== passwordConfirm) {
				return fail(400, {
					error: 'Passwords do not match'
				});
			}

			// Rate limit OTP verification attempts (5 attempts per 15 minutes per phone)
			const clientIp = getClientAddress();
			const canProceed = await checkRateLimit(`verify:${phonenumber}:${clientIp}`, 5, 15 * 60);

			if (!canProceed) {
				return fail(429, {
					error: 'Too many verification attempts. Please try again in 15 minutes.'
				});
			}

			// Use country code provided by frontend
			const formattedPhone = `${countryCode}${phonenumber}`;
			const verificationResult = await checkPhoneVerification(formattedPhone, otp);

			if (!verificationResult.success) {
				return fail(400, {
					error: verificationResult.message
				});
			}

			// Check if email or username already exists
			try {
				const existingUsers = await locals.pb.collection('users').getList(1, 1, {
					filter: `email = "${result.data.email}" || username = "${result.data.username}"`
				});

				if (existingUsers.items.length > 0) {
					return fail(400, {
						error: 'Email or username already exists'
					});
				}
			} catch {
				// Continue if check fails (PocketBase will catch duplicate on create)
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
			} catch {
				console.error('Email verification dispatch failed for user', record.id);
			}

			return {
				success: true,
				message: 'Registration successful! Please check your email to verify your account.',
				userId: record.id
			};
		} catch (err: unknown) {
			console.error('PocketBase user creation error:', err);

			// Handle duplicate email/username
			const error = err as { data?: { email?: unknown; username?: unknown } };
			if (error?.data?.email || error?.data?.username) {
				return fail(400, {
					error: 'Email or username already exists'
				});
			}

			return fail(500, {
				error: 'Failed to create account. Please try again or contact support.'
			});
		}
	},

	// STEP 1: Validate form and send OTP to phone
	register: async ({ request, getClientAddress }) => {
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

				),
				countryCode: zfd.text(
					z.string().regex(/^\+\d{1,4}$/, { message: 'Country code must be in format +XXX' })
				),
				role: zfd.text(z.enum(['buyer', 'provider'])),
				profile: zfd.file(
					z
						.instanceof(File)
						.refine((file) => file.size <= 5 * 1024 * 1024, {
							message: 'File size must be less than 5MB'
						})
						.refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
							message: 'Only JPG, PNG, and WEBP images are allowed'
						})
				)
			});

			const result = registerSchema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					errors: z.treeifyError(result.error)
				});
			}

			const { password, passwordConfirm, phonenumber, countryCode } = result.data;

			if (password !== passwordConfirm) {
				return fail(400, {
					error: 'Passwords do not match'
				});
			}

			// Rate limit OTP requests (3 requests per 10 minutes per phone)
			const clientIp = getClientAddress();
			const canProceed = await checkRateLimit(`register:${phonenumber}:${clientIp}`, 3, 10 * 60);

			if (!canProceed) {
				return fail(429, {
					error: 'Too many OTP requests. Please try again in 10 minutes.'
				});
			}

			// Use country code provided by frontend
			const formattedPhone = `${countryCode}${phonenumber}`;
			const phoneVerification = await startPhoneVerification(formattedPhone);

			if (phoneVerification.success) {
				return {
					success: false,
					otpSent: true,
					message:
						'A one-time password has been sent to your phone. Please enter it to complete registration.',
					phone: phonenumber
				};
			} else {
				return fail(400, {
					error: 'Phone verification failed. Please check your phone number and try again.'
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
