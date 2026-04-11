import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { contentService } from "./content.service";
import catchAsync from "../../../Shared/catchAsync";

const createContent = catchAsync(async (req, res) => {
  const result = await contentService.createContent(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Content created successfully",
    result,
  );
});

const getAllContents = catchAsync(async (req, res) => {
  const filter = {
    moduleId: req.query.moduleId as string,
    contentType: req.query.contentType as any,
    search: req.query.search as string,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await contentService.getAllContents(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Contents fetched successfully", result);
});

const getContentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await contentService.getContentById(id);
  sendResponse(res, httpStatus.OK, "Content fetched successfully", result);
});

const getContentsByModuleId = catchAsync(async (req, res) => {
  const moduleId = req.params.moduleId as string;
  const result = await contentService.getContentsByModuleId(moduleId);
  sendResponse(res, httpStatus.OK, "Contents fetched successfully", result);
});

const updateContent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await contentService.updateContent(id, req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Content updated successfully",
    result,
  );
});

const deleteContent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await contentService.deleteContent(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Content deleted successfully",
    result,
  );
});

export const contentController = {
  createContent,
  getAllContents,
  getContentById,
  getContentsByModuleId,
  updateContent,
  deleteContent,
};