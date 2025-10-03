import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

let redis: Redis | null = null;

export function getRedis(): Redis | null {
	if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
		console.warn('Redis credentials not configured. Rate limiting will be disabled.');
		return null;
	}

	if (!redis) {
		redis = new Redis({
			url: env.UPSTASH_REDIS_REST_URL,
			token: env.UPSTASH_REDIS_REST_TOKEN
		});
	}

	return redis;
}

export async function checkRateLimit(
	key: string,
	maxAttempts: number,
	windowSeconds: number
): Promise<boolean> {
	const redis = getRedis();
	if (!redis) {
		return true;
	}

	try {
		const current = await redis.incr(key);

		if (current === 1) {
			await redis.expire(key, windowSeconds);
		}

		return current <= maxAttempts;
	} catch (error) {
		console.error('Redis rate limit check failed:', error);
		return true;
	}
}
