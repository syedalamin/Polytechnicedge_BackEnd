import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import { sendResponse } from "./Shared/sendResponse.js";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import { handleNotFoundError } from "./errors/notFound.js";
import graphqlRouter from "./app/graphql/graphql.router.js";
import { Routers } from "./app/routers/index.js";

const app: Application = express();
const allowedOrigins = ["http://localhost:3000", "http://192.168.0.102:3000"];
app.use(
  helmet({
    contentSecurityPolicy: false, // GraphQL Playground/Fetch er jonno eta off rakha safe
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / mobile apps (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

app.get("/", async (req, res) => {
  sendResponse(res, httpStatus.OK, "Welcome to the API", { version: "1.0.0" });
});
app.use("/api/v1", Routers);
app.use("/api/v1", graphqlRouter);
app.use(handleNotFoundError);
app.use(globalErrorHandler);

export default app;
