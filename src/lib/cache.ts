import { createClient } from "@redis/client";

const redisClient = await createClient()
                        .on("error", (err) => console.error("Redis Client Error", err))
                        .connect();

/**
 * Higher-order function that wraps an async function with Redis caching
 * @template TArgs - The argument types of the wrapped function
 * @template TReturn - The return type of the wrapped function
 * @param fn - The async function to wrap
 * @param keyPrefix - Prefix for cache keys
 * @param ttl - Time to live in seconds (default: 3600)
 * @returns A wrapped function with caching behavior
 */
export function cache<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  keyPrefix: string,
  ttl: number = 3600
) {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      // Generate cache key from prefix and arguments
      const cacheKey = `${keyPrefix}:${JSON.stringify(args)}`;

      // Try to get from cache
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return JSON.parse(cached) as TReturn;
      }

      // Execute function if not cached
      const result = await fn(...args);

      // Store in cache with TTL
      await redisClient.setEx(cacheKey, ttl, JSON.stringify(result));

      return result;
    } catch (error) {
      // Fallback to executing function without cache on error
      console.error("Cache error, executing without cache:", error);
      return fn(...args);
    }
  };
}


export default redisClient;