import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 6000,
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    db: Number(process.env.REDIS_DB) || 0,
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    accessExpiresInMs: process.env.ACCESS_TOKEN_EXPIRE_MS,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_JWT,
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpiresInMs: process.env.REFRESH_TOKEN_EXPIRE_MS,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_JWT,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
};