import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { courseService } from "./course.service";
import catchAsync from "../../../Shared/catchAsync";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourse(req);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Course created successfully",
    result,
  );
});

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await courseService.updateCourse(id, req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Course updated successfully",
    result,
  );
});

const publishCourse = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await courseService.publishCourse(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Course published successfully",
    result,
  );
});

const unpublishCourse = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await courseService.unpublishCourse(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Course unpublished successfully",
    result,
  );
});

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await courseService.deleteCourse(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Course deleted successfully",
    result,
  );
});


export const courseController = {
  createCourse,
  updateCourse,
  publishCourse,
  unpublishCourse,
  deleteCourse,
 
};