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

const getAllCourseInstructors = catchAsync(async (req, res) => {
  const filter = {
    courseId: req.query.courseId as string,
    instructorId: req.query.instructorId as string,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await courseInstructorService.getAllCourseInstructors(
    filter,
    paginationOptions,
  );
  sendResponse(
    res,
    httpStatus.OK,
    "Course instructors fetched successfully",
    result,
  );
});

const getCourseInstructorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await courseInstructorService.getCourseInstructorById(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Course instructor fetched successfully",
    result,
  );
});

const getCourseInstructorsByCourseId = catchAsync(async (req, res) => {
  const courseId = req.params.courseId as string;
  const result = await courseInstructorService.getCourseInstructorsByCourseId(
    courseId,
  );
  sendResponse(
    res,
    httpStatus.OK,
    "Course instructors fetched successfully",
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
  getAllCourseInstructors,
  getCourseInstructorById,
  getCourseInstructorsByCourseId,
  deleteCourseInstructor,
};