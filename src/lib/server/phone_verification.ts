import twilio from 'twilio';
import { env } from '$env/dynamic/private';

export async function startPhoneVerification(
	phoneNumber: string
): Promise<{ success: boolean; message: string; sid?: string }> {
	try {
		// Get environment variables
		const TWILIO_ACCOUNT_SID = env.TWILIO_ACCOUNT_SID;
		const TWILIO_AUTH_TOKEN = env.TWILIO_AUTH_TOKEN;
		const TWILIO_VERIFY_SERVICE_SID = env.TWILIO_VERIFY_SERVICE_SID;

		// Check if credentials are available
		if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
			console.error('Missing Twilio credentials:', {
				hasAccountSid: !!TWILIO_ACCOUNT_SID,
				hasAuthToken: !!TWILIO_AUTH_TOKEN,
				hasVerifyServiceSid: !!TWILIO_VERIFY_SERVICE_SID
			});
			return { success: false, message: 'Twilio configuration missing' };
		}

		// Initialize client
		const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

		// Start verification
		const verification = await client.verify.v2
			.services(TWILIO_VERIFY_SERVICE_SID)
			.verifications.create({ to: phoneNumber, channel: 'sms' });

		return {
			success: true,
			message: 'Verification code sent to your phone',
			sid: verification.sid
		};
	} catch (error) {
		console.error('Failed to start phone verification:', error);
		return { success: false, message: 'Failed to send verification code' };
	}
}

export async function checkPhoneVerification(
	phoneNumber: string,
	code: string
): Promise<{ success: boolean; message: string; status?: string }> {
	try {
		// Get environment variables
		const TWILIO_ACCOUNT_SID = env.TWILIO_ACCOUNT_SID;
		const TWILIO_AUTH_TOKEN = env.TWILIO_AUTH_TOKEN;
		const TWILIO_VERIFY_SERVICE_SID = env.TWILIO_VERIFY_SERVICE_SID;

		// Check if credentials are available
		if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
			return { success: false, message: 'Twilio configuration missing' };
		}

		// Initialize client
		const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

		// Check verification
		const verificationCheck = await client.verify.v2
			.services(TWILIO_VERIFY_SERVICE_SID)
			.verificationChecks.create({ to: phoneNumber, code: code });

		if (verificationCheck.status === 'approved') {
			return {
				success: true,
				message: 'Phone number verified successfully',
				status: verificationCheck.status
			};
		} else {
			return {
				success: false,
				message: 'Invalid verification code',
				status: verificationCheck.status
			};
		}
	} catch (error) {
		console.error('Failed to check phone verification:', error);
		return { success: false, message: 'Verification failed. Please try again.' };
	}
}
