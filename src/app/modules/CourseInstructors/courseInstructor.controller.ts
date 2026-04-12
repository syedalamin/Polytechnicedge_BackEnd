import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { courseInstructorService } from "./courseInstructor.service";
import catchAsync from "../../../Shared/catchAsync";

const createCourseInstructor = catchAsync(async (req, res) => {
  const result = await courseInstructorService.createCourseInstructor(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Course instructor created successfully",
    result,
  );
});

 

const deleteCourseInstructor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await courseInstructorService.deleteCourseInstructor(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Course instructor deleted successfully",
    result,
  );
});

export const courseInstructorController = {
  createCourseInstructor,
 
  deleteCourseInstructor,
};