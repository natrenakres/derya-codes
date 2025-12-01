import { Redis } from "@upstash/redis";

export const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});

export default redis;