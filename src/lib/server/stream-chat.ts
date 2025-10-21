/**
 * STREAM CHAT SERVICE - Server-Side Integration
 * ==============================================
 * 
 * This module provides GetStream Chat functionality for real-time messaging
 * between buyers and providers in the GoWork platform.
 * 
 * INTEGRATION WITH POCKETBASE AUTH:
 * ---------------------------------
 * Stream users are automatically synced with PocketBase users.
 * User authentication is handled via PocketBase (see hooks.server.ts),
 * and Stream tokens are generated server-side for secure client connections.
 * 
 * ENVIRONMENT SETUP:
 * ------------------
 * Required environment variables in .env:
 * - STREAM_API_KEY=your_stream_api_key
 * - STREAM_API_SECRET=your_stream_api_secret
 * 
 * Get credentials from: https://dashboard.getstream.io/
 */

import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY, STREAM_API_SECRET } from '$env/static/private';

let streamClient: StreamChat;

export function getStreamClient(): StreamChat {
	if (!streamClient) {
		if (!STREAM_API_KEY || !STREAM_API_SECRET) {
			throw new Error('Stream API credentials are not configured');
		}
		streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
	}
	return streamClient;
}

export function generateUserToken(userId: string): string {
	const client = getStreamClient();
	return client.createToken(userId);
}

export async function createOrGetUser(
	userId: string,
	userData: {
		name: string;
		email?: string;
		avatar?: string;
		role?: string;
	}
) {
	const client = getStreamClient();
	
	await client.upsertUser({
		id: userId,
		name: userData.name,
		image: userData.avatar,
		role: userData.role || 'user',
		...((userData.email && { email: userData.email }))
	});
	
	return { userId, token: generateUserToken(userId) };
}

export async function createChannel(
	channelType: string,
	channelId: string,
	members: string[],
	channelData?: {
		name?: string;
		orderId?: string;
		jobId?: string;
	}
) {
	const client = getStreamClient();
	
	const channel = client.channel(channelType, channelId, {
		members,
		created_by_id: members[0],
		...(channelData?.name && { name: channelData.name }),
		...(channelData?.orderId && { order_id: channelData.orderId }),
		...(channelData?.jobId && { job_id: channelData.jobId })
	});
	
	await channel.create();
	return channel;
}

export async function getOrCreateConversationChannel(
	buyerId: string,
	providerId: string,
	orderId: string
) {
	const client = getStreamClient();
	
	const channelId = `order-${orderId}`;
	const members = [buyerId, providerId];
	
	const channel = client.channel('messaging', channelId, {
		members,
		created_by_id: buyerId,
		order_id: orderId
	});
	
	await channel.create();
	
	return {
		channelId: channel.id,
		cid: channel.cid,
		members
	};
}

export async function addMemberToChannel(channelType: string, channelId: string, userId: string) {
	const client = getStreamClient();
	const channel = client.channel(channelType, channelId);
	
	await channel.addMembers([userId]);
	
	return channel;
}

export async function removeMemberFromChannel(
	channelType: string,
	channelId: string,
	userId: string
) {
	const client = getStreamClient();
	const channel = client.channel(channelType, channelId);
	
	await channel.removeMembers([userId]);
	
	return channel;
}

export async function deleteChannel(channelType: string, channelId: string) {
	const client = getStreamClient();
	const channel = client.channel(channelType, channelId);
	
	await channel.delete();
	
	return { success: true };
}

export async function sendSystemMessage(
	channelType: string,
	channelId: string,
	message: string,
	userId: string
) {
	const client = getStreamClient();
	const channel = client.channel(channelType, channelId);
	
	await channel.sendMessage({
		text: message,
		user_id: userId,
		type: 'system'
	});
	
	return { success: true };
}

export async function getChannelMessages(
	channelType: string,
	channelId: string,
	limit: number = 50
) {
	const client = getStreamClient();
	const channel = client.channel(channelType, channelId);
	
	const state = await channel.watch();
	
	return state.messages;
}

export async function queryUserChannels(userId: string, limit: number = 20) {
	const client = getStreamClient();
	
	const filter = { type: 'messaging', members: { $in: [userId] } };
	const sort = [{ last_message_at: -1 as const }];
	
	const channels = await client.queryChannels(filter, sort, {
		watch: true,
		limit
	});
	
	return channels;
}
