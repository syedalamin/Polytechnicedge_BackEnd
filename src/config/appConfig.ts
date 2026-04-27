import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    db: Number(process.env.REDIS_DB),
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    accessExpiresInMs: process.env.ACCESS_TOKEN_EXPIRE_MS,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_JWT,
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpiresInMs: process.env.REFRESH_TOKEN_EXPIRE_MS,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_JWT,
    resetSecret: process.env.RESET_SECRET,
    resetExpiresInMs: process.env.RESET_TOKEN_EXPIRE_MS,
    resetExpiresIn: process.env.RESET_TOKEN_EXPIRE_JWT,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.EMAIL_SECURE),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  frontendUrl: process.env.FRONTEND_URL,
  ssl: {
    storeId: process.env.SSL_STORE_ID,
    storePassword: process.env.SSL_STORE_PASSWORD,
    isLive: process.env.SSL_IS_LIVE === "true",
    isSandbox: process.env.SSL_IS_SANDBOX === "true",
    backendUrl: process.env.BACKEND_URL,
  },
};
