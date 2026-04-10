import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { studentsService } from "./student.service";
import catchAsync from "../../../Shared/catchAsync";

const createStudentProfile = catchAsync(async (req, res) => {
  const result = await studentsService.createStudentProfile(req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Student profile created successfully",
    result,
  );
});
const updateStudentProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await studentsService.updateStudentProfile(id, req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Student profile updated successfully",
    result,
  );
});

const deleteStudentProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await studentsService.deleteStudentProfile(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Student profile deleted successfully",
    result,
  );
});

export const studentsController = {
  createStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
};
