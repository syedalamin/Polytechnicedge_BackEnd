import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { noticeService } from "./notice.service";
import catchAsync from "../../../Shared/catchAsync";

const createNotice = catchAsync(async (req, res) => {
  const result = await noticeService.createNotice(req);
  sendResponse(res, httpStatus.CREATED, "Notice created successfully", result);
});

const updateNotice = catchAsync(async (req, res) => {
  const result = await noticeService.updateNotice(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Notice updated successfully", result);
});

const deleteNotice = catchAsync(async (req, res) => {
  const result = await noticeService.deleteNotice(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Notice deleted successfully", result);
});

export const noticeController = {
  createNotice,
  updateNotice,
  deleteNotice,
};