import Redis from "ioredis";
import { appConfig } from "./appConfig.js";

const redisClient = new Redis({
  host: appConfig.redis.host,
  port: appConfig.redis.port,
  password: appConfig.redis.password,
  db: appConfig.redis.db,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});

export default redisClient;
