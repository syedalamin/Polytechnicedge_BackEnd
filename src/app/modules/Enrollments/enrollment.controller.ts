import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { enrollmentService } from "./enrollment.service";
import catchAsync from "../../../Shared/catchAsync";

const createEnrollment = catchAsync(async (req, res) => {
  const result = await enrollmentService.createEnrollment(req.body);
  sendResponse(res, httpStatus.CREATED, "Enrollment created successfully", result);
});

const getAllEnrollments = catchAsync(async (req, res) => {
  const filter = {
    userId: req.query.userId as string | undefined,
    courseId: req.query.courseId as string | undefined,
    status: req.query.status as any,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await enrollmentService.getAllEnrollments(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Enrollments fetched successfully", result);
});

const getEnrollmentById = catchAsync(async (req, res) => {
  const result = await enrollmentService.getEnrollmentById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Enrollment fetched successfully", result);
});

const getEnrollmentsByUserId = catchAsync(async (req, res) => {
  const result = await enrollmentService.getEnrollmentsByUserId(req.params.userId as string);
  sendResponse(res, httpStatus.OK, "Enrollments fetched successfully", result);
});

const getEnrollmentsByCourseId = catchAsync(async (req, res) => {
  const result = await enrollmentService.getEnrollmentsByCourseId(req.params.courseId as string);
  sendResponse(res, httpStatus.OK, "Enrollments fetched successfully", result);
});

const updateEnrollment = catchAsync(async (req, res) => {
  const result = await enrollmentService.updateEnrollment(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Enrollment updated successfully", result);
});

const deleteEnrollment = catchAsync(async (req, res) => {
  const result = await enrollmentService.deleteEnrollment(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Enrollment deleted successfully", result);
});

export const enrollmentController = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentsByUserId,
  getEnrollmentsByCourseId,
  updateEnrollment,
  deleteEnrollment,
};