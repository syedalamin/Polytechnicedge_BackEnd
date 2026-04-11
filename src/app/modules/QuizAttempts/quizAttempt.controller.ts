import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { quizAttemptService } from "./quizAttempt.service";
import catchAsync from "../../../Shared/catchAsync";

const createQuizAttempt = catchAsync(async (req, res) => {
  const result = await quizAttemptService.createQuizAttempt(req.body);
  sendResponse(res, httpStatus.CREATED, "Quiz attempt created successfully", result);
});

const getAllQuizAttempts = catchAsync(async (req, res) => {
  const filter = {
    userId: req.query.userId as string | undefined,
    quizId: req.query.quizId as string | undefined,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await quizAttemptService.getAllQuizAttempts(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Quiz attempts fetched successfully", result);
});

const getQuizAttemptById = catchAsync(async (req, res) => {
  const result = await quizAttemptService.getQuizAttemptById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Quiz attempt fetched successfully", result);
});

const getQuizAttemptsByQuizId = catchAsync(async (req, res) => {
  const result = await quizAttemptService.getQuizAttemptsByQuizId(req.params.quizId as string);
  sendResponse(res, httpStatus.OK, "Quiz attempts fetched successfully", result);
});

const getQuizAttemptsByUserId = catchAsync(async (req, res) => {
  const result = await quizAttemptService.getQuizAttemptsByUserId(req.params.userId as string);
  sendResponse(res, httpStatus.OK, "Quiz attempts fetched successfully", result);
});

const updateQuizAttempt = catchAsync(async (req, res) => {
  const result = await quizAttemptService.updateQuizAttempt(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Quiz attempt updated successfully", result);
});

const deleteQuizAttempt = catchAsync(async (req, res) => {
  const result = await quizAttemptService.deleteQuizAttempt(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Quiz attempt deleted successfully", result);
});

export const quizAttemptController = {
  createQuizAttempt,
  getAllQuizAttempts,
  getQuizAttemptById,
  getQuizAttemptsByQuizId,
  getQuizAttemptsByUserId,
  updateQuizAttempt,
  deleteQuizAttempt,
};