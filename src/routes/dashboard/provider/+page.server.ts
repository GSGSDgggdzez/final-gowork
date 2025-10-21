import { redirect, fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

/**
 * FRONTEND DEVELOPER GUIDE - PROVIDER DASHBOARD
 * ==============================================
 * 
 * PAGE DATA:
 * - data.availableJobs - Array of jobs matching provider's skills
 * - data.providerProfile - Provider's profile information
 * - data.skills - All available skills for multi-select dropdown
 * 
 * Jobs are filtered by:
 * 1. Provider's services/skills (category_id matches provider's services)
 * 2. Job status (only "open" jobs)
 * 3. Location proximity (jobs within ~50km of provider's location)
 * 
 * ACTION: ?/updateProfile
 * -----------------------
 * Update provider profile information
 * 
 * Form fields (as multipart/form-data):
 * - bio (String, REQUIRED) - Min 20 chars, max 500 chars
 * - languages (String, OPTIONAL) - JSON array as string. e.g., '["English", "Amharic"]'
 * - services (String, REQUIRED) - JSON array of skill IDs. e.g., '["skill_id_1", "skill_id_2"]'
 * - availability (String, OPTIONAL) - JSON object as string. e.g., '{"monday": ["9:00-17:00"]}'
 * - current_geolocation (String, REQUIRED) - JSON object. e.g., '{"lon": 38.7469, "lat": 9.0054}'
 * - content (File, OPTIONAL) - New portfolio file (max 10MB, jpg/png/pdf). Leave empty to keep existing file.
 * 
 * Response on success: Returns { success: true }
 * Response on error: { error: "message", errors: {...} }
 */

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/sign_in');
	}

	const user = locals.pb.authStore.record;
	if (!user?.role?.includes('provider')) {
		throw redirect(303, '/');
	}

	const providerProfile = await locals.pb.collection('provider_profiles').getFirstListItem(
		`user_id = "${user.id}"`,
		{
			expand: 'services'
		}
	);

	if (!providerProfile) {
		throw redirect(303, '/provider_detail');
	}

	const services = providerProfile.services || [];
	
	const filterParts = ['statue = "open"'];

	if (services.length > 0) {
		const categoryFilters = services.map((serviceId: string) => `category_id ~ "${serviceId}"`).join(' || ');
		filterParts.push(`(${categoryFilters})`);
	}

	const providerLon = providerProfile.current_geolocation?.lon;
	const providerLat = providerProfile.current_geolocation?.lat;
	
	if (providerLon !== undefined && providerLat !== undefined) {
		const radius = 0.5;
		filterParts.push(`geolocation.lon >= ${providerLon - radius} && geolocation.lon <= ${providerLon + radius}`);
		filterParts.push(`geolocation.lat >= ${providerLat - radius} && geolocation.lat <= ${providerLat + radius}`);
	}

	const filter = filterParts.join(' && ');

	const availableJobs = await locals.pb.collection('jobs').getList(1, 50, {
		filter,
		sort: '-created',
		expand: 'buyer_id,category_id'
	});

	const skills = await locals.pb.collection('skills').getFullList({
		sort: 'name'
	});

	return {
		availableJobs: availableJobs.items,
		providerProfile,
		skills
	};
});

export const actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.pb.authStore.isValid) {
			return fail(401, {
				error: 'You must be logged in to update your profile'
			});
		}

		const user = locals.pb.authStore.record;
		if (!user?.role?.includes('provider')) {
			return fail(403, {
				error: 'Only providers can update provider profiles'
			});
		}

		try {
			const providerProfile = await locals.pb.collection('provider_profiles').getFirstListItem(
				`user_id = "${user.id}"`
			);

			const formData = await request.formData();
			const contentFile = formData.get('content');

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
						{ message: 'Services must be a valid JSON array with at least one service' }
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
						.optional()
				)
			});

			const result = schema.safeParse(formData);
			if (!result.success) {
				return fail(400, {
					errors: z.treeifyError(result.error)
				});
			}

			const updateData: Record<string, unknown> = {
				bio: result.data.bio,
				current_geolocation: JSON.parse(result.data.current_geolocation),
				languages: JSON.parse(result.data.languages),
				availability: JSON.parse(result.data.availability),
				services: JSON.parse(result.data.services)
			};

			if (contentFile && contentFile instanceof File && contentFile.size > 0) {
				updateData.content = result.data.content;
			}

			await locals.pb.collection('provider_profiles').update(providerProfile.id, updateData);

			return { success: true };
		} catch (err: unknown) {
			console.error('Provider profile update error:', err);

			return fail(500, {
				error: 'Failed to update provider profile. Please try again or contact support.'
			});
		}
	}
};