import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import httpStatus from "http-status";
import { sendResponse } from "./Shared/sendResponse.js";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import { handleNotFoundError } from "./errors/notFound.js";
import graphqlRouter from "./app/graphql/graphql.router.js";
 
const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(parse)

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
app.use(graphqlRouter)
app.use(handleNotFoundError);
app.use(globalErrorHandler);

export default app;
