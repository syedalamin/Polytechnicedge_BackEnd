import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { quizQuestionService } from "./quizQuestion.service";
import catchAsync from "../../../Shared/catchAsync";

const createQuizQuestion = catchAsync(async (req, res) => {
  const result = await quizQuestionService.createQuizQuestion(req.body);
  sendResponse(res, httpStatus.CREATED, "Quiz question created successfully", result);
});

const getAllQuizQuestions = catchAsync(async (req, res) => {
  const filter = { quizId: req.query.quizId as string, search: req.query.search as string };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await quizQuestionService.getAllQuizQuestions(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Quiz questions fetched successfully", result);
});

const getQuizQuestionById = catchAsync(async (req, res) => {
  const result = await quizQuestionService.getQuizQuestionById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Quiz question fetched successfully", result);
});

const getQuizQuestionsByQuizId = catchAsync(async (req, res) => {
  const result = await quizQuestionService.getQuizQuestionsByQuizId(req.params.quizId as string);
  sendResponse(res, httpStatus.OK, "Quiz questions fetched successfully", result);
});

const updateQuizQuestion = catchAsync(async (req, res) => {
  const result = await quizQuestionService.updateQuizQuestion(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Quiz question updated successfully", result);
});

const deleteQuizQuestion = catchAsync(async (req, res) => {
  const result = await quizQuestionService.deleteQuizQuestion(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Quiz question deleted successfully", result);
});

export const quizQuestionController = {
  createQuizQuestion,
  getAllQuizQuestions,
  getQuizQuestionById,
  getQuizQuestionsByQuizId,
  updateQuizQuestion,
  deleteQuizQuestion,
};