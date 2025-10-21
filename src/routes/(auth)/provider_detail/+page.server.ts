import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

/**
 * FRONTEND DEVELOPER GUIDE - COMPLETE PROVIDER PROFILE
 * =====================================================
 *
 * This page allows already-registered users with 'provider' role to complete their provider profile.
 * The user must be authenticated before accessing this page.
 *
 * PAGE DATA (Available from load function):
 * -----------------------------------------
 * - data.user - Current authenticated user (id, username, email)
 * - data.skills - Array of all available skills from the skills collection
 *   Example: [{ id: "abc123", name: "Plumbing", slug: "plumbing", created: "...", updated: "..." }, ...]
 *
 * Action: ?/createProfile
 *
 * Form fields to include (as multipart/form-data):
 * - bio (String, REQUIRED) - Min 20 chars, max 500 chars. Text area describing provider's services/expertise
 * - languages (String, OPTIONAL) - JSON array as string. e.g., '["English", "Amharic", "French"]'
 * - services (String, REQUIRED) - JSON array of skill/category relation IDs. e.g., '["skill_id_1", "skill_id_2"]'
 *   Must have at least one service. Use IDs from data.skills array.
 * - availability (String, OPTIONAL) - JSON object as string. e.g., '{"monday": ["9:00-17:00"], "tuesday": ["9:00-17:00"]}'
 * - current_geolocation (String, REQUIRED) - JSON object with lon/lat. e.g., '{"lon": 38.7469, "lat": 9.0054}'
 * - content (File, REQUIRED) - Portfolio/certificate/work samples (max 10MB, jpg/png/pdf only)
 *
 * Response on success:
 * Redirects to /provider/dashboard
 *
 * Response on error:
 * {
 *   error: "Error message to display"
 *   errors: {...} (Zod validation errors)
 * }
 *
 * IMPORTANT NOTES:
 * ----------------
 * - User MUST be logged in (user info from locals.pb.authStore)
 * - User MUST have 'provider' role
 * - The user_id is automatically taken from the authenticated user
 * - rating and total_review are automatically set to 0 (will be updated as provider gets reviews)
 * - Each provider can only create ONE profile (enforced by unique user_id constraint)
 * - Use data.skills to populate a multi-select dropdown for the services field
 * - services field is sent as Array<String> of relation record IDs to PocketBase
 *
 * EXAMPLE FORM DATA:
 * ------------------
 * bio: "Experienced plumber with 10 years of expertise in residential and commercial plumbing."
 * languages: '["English", "Amharic", "Tigrinya"]'
 * services: '["abc123", "def456"]' (skill/category IDs from data.skills)
 * availability: '{"monday": ["9:00-12:00", "14:00-18:00"], "wednesday": ["10:00-16:00"], "friday": ["9:00-17:00"]}'
 * current_geolocation: '{"lon": 38.7469, "lat": 9.0054}'
 * content: [File object]
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/sign_in');
	}

	const user = locals.pb.authStore.record;
	if (!user?.role?.includes('provider')) {
		throw redirect(303, '/');
	}

	try {
		const existingProfile = await locals.pb.collection('provider_profiles').getList(1, 1, {
			filter: `user_id = "${user.id}"`
		});

		if (existingProfile.items.length > 0) {
			throw redirect(303, '/provider/dashboard');
		}
	} catch (err) {
		if (typeof err === 'object' && err !== null && 'status' in err && 'location' in err) {
			throw err;
		}
	}

	const skills = await locals.pb.collection('categories').getFullList({
		sort: 'name'
	});


	return {
		user: {
			id: user.id,
			username: user.username,
			email: user.email
		},
		skills
	};
}

export const actions = {
	createProfile: async ({ request, locals }) => {
		if (!locals.pb.authStore.isValid) {
			return fail(401, {
				error: 'You must be logged in to create a provider profile'
			});
		}

		const user = locals.pb.authStore.record;
		if (!user?.role?.includes('provider')) {
			return fail(403, {
				error: 'Only users with provider role can create a provider profile'
			});
		}

		try {
			const formData = await request.formData();

			const schema = zfd.formData({
				bio: zfd.text(
					z
						.string()
						.min(20, { message: 'Bio must be at least 20 characters' })
						.max(500, { message: 'Bio must not exceed 500 characters' })
				),
				languages: zfd.text(
					z.string().refine(
						(val) => {
							try {
								const parsed = JSON.parse(val);
								return Array.isArray(parsed) && parsed.length > 0;
							} catch {
								return false;
							}
						},
						{ message: 'Languages must be a valid JSON array with at least one language' }
					)
				),
				services: zfd.text(
					z.string().refine(
						(val) => {
							try {
								const parsed = JSON.parse(val);
								return Array.isArray(parsed) && parsed.length > 0;
							} catch {
								return false;
							}
						},
						{ message: 'services must be a valid JSON array with at least one service' }
					)
				),
				availability: zfd.text(
					z.string().refine(
						(val) => {
							try {
								const parsed = JSON.parse(val);
								return typeof parsed === 'object' && !Array.isArray(parsed);
							} catch {
								return false;
							}
						},
						{ message: 'Availability must be a valid JSON object' }
					)
				),
				current_geolocation: zfd.text(
					z.string().refine(
						(val) => {
							try {
								const parsed = JSON.parse(val);
								return (
									typeof parsed === 'object' &&
									typeof parsed.lon === 'number' &&
									typeof parsed.lat === 'number'
								);
							} catch {
								return false;
							}
						},
						{ message: 'Geolocation must be a valid JSON object with lon and lat numbers' }
					)
				),
				content: zfd.file(
					z
						.instanceof(File)
						.refine((file) => file.size <= 10 * 1024 * 1024, {
							message: 'Content file must be less than 10MB'
						})
						.refine(
							(file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
							{
								message: 'Only JPG, PNG, and PDF files are allowed'
							}
						)
				)
			});

			const result = schema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					errors: z.treeifyError(result.error)
				});
			}

			const providerData = {
			  user_id: user.id,
			  bio: result.data.bio,
			  current_geolocation: JSON.parse(result.data.current_geolocation),
			  languages: JSON.parse(result.data.languages),
			  availability: JSON.parse(result.data.availability),
			  services: JSON.parse(result.data.services),
			  content: result.data.content,
			  rating: 0,
			  total_review: 0
			};

			await locals.pb.collection('provider_profiles').create(providerData);

			throw redirect(303, '/provider/dashboard');
		} catch (err: unknown) {
			if (typeof err === 'object' && err !== null && 'status' in err && 'location' in err) {
				throw err;
			}

			console.error('Provider profile creation error:', err);

			const error = err as { data?: { user_id?: unknown } };
			if (error?.data?.user_id) {
				return fail(400, {
					error: 'You already have a provider profile'
				});
			}

			return fail(500, {
				error: 'Failed to create provider profile. Please try again or contact support.'
			});
		}
	}
};
