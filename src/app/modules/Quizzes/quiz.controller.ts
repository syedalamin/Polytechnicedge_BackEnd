import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { quizService } from "./quiz.service";
import catchAsync from "../../../Shared/catchAsync";

const createQuiz = catchAsync(async (req, res) => {
  const result = await quizService.createQuiz(req.body);
  sendResponse(res, httpStatus.CREATED, "Quiz created successfully", result);
});

const getAllQuizzes = catchAsync(async (req, res) => {
  const filter = { 
    moduleId: req.query.moduleId as string | undefined, 
    search: req.query.search as string | undefined 
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await quizService.getAllQuizzes(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Quizzes fetched successfully", result);
});

const getQuizById = catchAsync(async (req, res) => {
  const result = await quizService.getQuizById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Quiz fetched successfully", result);
});

const getQuizzesByModuleId = catchAsync(async (req, res) => {
  const result = await quizService.getQuizzesByModuleId(req.params.moduleId as string);
  sendResponse(res, httpStatus.OK, "Quizzes fetched successfully", result);
});

const updateQuiz = catchAsync(async (req, res) => {
  const result = await quizService.updateQuiz(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Quiz updated successfully", result);
});

const deleteQuiz = catchAsync(async (req, res) => {
  const result = await quizService.deleteQuiz(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Quiz deleted successfully", result);
});

export const quizController = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByModuleId,
  updateQuiz,
  deleteQuiz,
};