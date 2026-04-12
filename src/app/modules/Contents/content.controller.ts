import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { contentService } from "./content.service";
import catchAsync from "../../../Shared/catchAsync";

const createContent = catchAsync(async (req, res) => {
  const result = await contentService.createContent(req.body);
  sendResponse(res, httpStatus.CREATED, "Content created successfully", result);
});

const updateContent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await contentService.updateContent(id, req.body);
  sendResponse(res, httpStatus.OK, "Content updated successfully", result);
});

const deleteContent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await contentService.deleteContent(id);
  sendResponse(res, httpStatus.OK, "Content deleted successfully", result);
});

export const contentController = {
  createContent,
  updateContent,
  deleteContent,
};
