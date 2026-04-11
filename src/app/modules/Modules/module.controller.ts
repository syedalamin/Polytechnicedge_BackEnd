import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { moduleService } from "./module.service";
import catchAsync from "../../../Shared/catchAsync";

const createModule = catchAsync(async (req, res) => {
  const result = await moduleService.createModule(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Module created successfully",
    result,
  );
});

const getAllModules = catchAsync(async (req, res) => {
  const filter = {
    courseId: req.query.courseId as string,
    search: req.query.search as string,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await moduleService.getAllModules(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Modules fetched successfully", result);
});

const getModuleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await moduleService.getModuleById(id);
  sendResponse(res, httpStatus.OK, "Module fetched successfully", result);
});

const getModulesByCourseId = catchAsync(async (req, res) => {
  const courseId = req.params.courseId as string;
  const result = await moduleService.getModulesByCourseId(courseId);
  sendResponse(res, httpStatus.OK, "Modules fetched successfully", result);
});

const updateModule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await moduleService.updateModule(id, req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Module updated successfully",
    result,
  );
});

const deleteModule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await moduleService.deleteModule(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Module deleted successfully",
    result,
  );
});

export const moduleController = {
  createModule,
  getAllModules,
  getModuleById,
  getModulesByCourseId,
  updateModule,
  deleteModule,
};