import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { instructorService } from "./instructor.service";
import catchAsync from "../../../Shared/catchAsync";

const createInstructor = catchAsync(async (req, res) => {
  const result = await instructorService.createInstructor(req.body);
  sendResponse(res, httpStatus.CREATED, "Instructor created successfully", result);
});



const updateInstructorProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await instructorService.updateInstructorProfile(id, req.body);
  sendResponse(res, httpStatus.OK, "Instructor profile updated successfully", result);
});

export const instructorController = {
  createInstructor,
  updateInstructorProfile,
};