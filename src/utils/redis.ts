import redisClient from "../config/redisClient.js";

const DEFAULT_TTL = 3600;

export const redis = {
  async get<T>(key: string): Promise<T | null> {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  },

  async set(key: string, value: unknown, ttl = DEFAULT_TTL): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), "EX", ttl);
  },

  async del(key: string): Promise<void> {
    await redisClient.del(key);
  },

  async delPattern(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  },

  async exists(key: string): Promise<boolean> {
    return (await redisClient.exists(key)) === 1;
  },

  async expire(key: string, ttl: number): Promise<void> {
    await redisClient.expire(key, ttl);
  },

  async ttl(key: string): Promise<number> {
    return await redisClient.ttl(key);
  },

  async incr(key: string): Promise<number> {
    return await redisClient.incr(key);
  },

  async decr(key: string): Promise<number> {
    return await redisClient.decr(key);
  },
};

export default redis;
