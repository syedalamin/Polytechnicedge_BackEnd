import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { courseBundleService } from "./bundle.service";
import catchAsync from "../../../Shared/catchAsync";

const createCourseBundle = catchAsync(async (req, res) => {
  const result = await courseBundleService.createCourseBundle(req.body);
  sendResponse(res, httpStatus.CREATED, "Course bundle created successfully", result);
});

const updateCourseBundle = catchAsync(async (req, res) => {
  const result = await courseBundleService.updateCourseBundle(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Course bundle updated successfully", result);
});



const deleteCourseBundle = catchAsync(async (req, res) => {
  const result = await courseBundleService.deleteCourseBundle(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Course bundle deleted successfully", result);
});

export const courseBundleController = {
  createCourseBundle,
  updateCourseBundle,
  deleteCourseBundle,
};