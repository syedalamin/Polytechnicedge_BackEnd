import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { userProgressService } from "./progress.service";
import catchAsync from "../../../Shared/catchAsync";

const createUserProgress = catchAsync(async (req, res) => {
  const result = await userProgressService.createUserProgress(req.body);
  sendResponse(res, httpStatus.CREATED, "User progress created successfully", result);
});

const getAllUserProgress = catchAsync(async (req, res) => {
  const filter = {
    userId: req.query.userId as string | undefined,
    courseId: req.query.courseId as string | undefined,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await userProgressService.getAllUserProgress(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "User progress fetched successfully", result);
});

const getUserProgressById = catchAsync(async (req, res) => {
  const result = await userProgressService.getUserProgressById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "User progress fetched successfully", result);
});

const getUserProgressByUserId = catchAsync(async (req, res) => {
  const result = await userProgressService.getUserProgressByUserId(req.params.userId as string);
  sendResponse(res, httpStatus.OK, "User progress fetched successfully", result);
});

const getUserProgressByCourseId = catchAsync(async (req, res) => {
  const result = await userProgressService.getUserProgressByCourseId(req.params.courseId as string);
  sendResponse(res, httpStatus.OK, "User progress fetched successfully", result);
});

const getUserProgressByUserAndCourse = catchAsync(async (req, res) => {
  const result = await userProgressService.getUserProgressByUserAndCourse(req.params.userId as string, req.params.courseId as string);
  sendResponse(res, httpStatus.OK, "User progress fetched successfully", result);
});

const updateUserProgress = catchAsync(async (req, res) => {
  const result = await userProgressService.updateUserProgress(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "User progress updated successfully", result);
});

const deleteUserProgress = catchAsync(async (req, res) => {
  const result = await userProgressService.deleteUserProgress(req.params.id as string);
  sendResponse(res, httpStatus.OK, "User progress deleted successfully", result);
});

export const userProgressController = {
  createUserProgress,
  getAllUserProgress,
  getUserProgressById,
  getUserProgressByUserId,
  getUserProgressByCourseId,
  getUserProgressByUserAndCourse,
  updateUserProgress,
  deleteUserProgress,
};