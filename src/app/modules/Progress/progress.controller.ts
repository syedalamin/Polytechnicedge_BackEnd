import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { userProgressService } from "./progress.service";
import catchAsync from "../../../Shared/catchAsync";

const createUserProgress = catchAsync(async (req, res) => {
  const result = await userProgressService.createUserProgress(req.body);
  sendResponse(res, httpStatus.CREATED, "User progress created successfully", result);
});



const updateUserProgress = catchAsync(async (req, res) => {
  const result = await userProgressService.updateUserProgress(req.body);
  sendResponse(res, httpStatus.OK, "User progress updated successfully", result);
});

const deleteUserProgress = catchAsync(async (req, res) => {
  const result = await userProgressService.deleteUserProgress(req.params.id as string);
  sendResponse(res, httpStatus.OK, "User progress deleted successfully", result);
});

const markCourseComplete = catchAsync(async (req, res) => {
  const { courseId } = req.body;
  const result = await userProgressService.markCourseComplete(courseId);
  sendResponse(res, httpStatus.OK, "Course marked as completed successfully", result);
});


export const userProgressController = {
  createUserProgress,
  updateUserProgress,
  deleteUserProgress,
  markCourseComplete,
};