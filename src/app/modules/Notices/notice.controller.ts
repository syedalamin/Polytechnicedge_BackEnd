import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { noticeService } from "./notice.service";
import catchAsync from "../../../Shared/catchAsync";

const createNotice = catchAsync(async (req, res) => {
  const result = await noticeService.createNotice(req.body);
  sendResponse(res, httpStatus.CREATED, "Notice created successfully", result);
});

const getAllNotices = catchAsync(async (req, res) => {
  const filter = {
    authorId: req.query.authorId as string | undefined,
    isGlobal: req.query.isGlobal === "true" ? true : req.query.isGlobal === "false" ? false : undefined,
    courseId: req.query.courseId as string | undefined,
    search: req.query.search as string | undefined,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await noticeService.getAllNotices(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Notices fetched successfully", result);
});

const getNoticeById = catchAsync(async (req, res) => {
  const result = await noticeService.getNoticeById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Notice fetched successfully", result);
});

const getGlobalNotices = catchAsync(async (req, res) => {
  const result = await noticeService.getGlobalNotices();
  sendResponse(res, httpStatus.OK, "Global notices fetched successfully", result);
});

const getNoticesByCourseId = catchAsync(async (req, res) => {
  const result = await noticeService.getNoticesByCourseId(req.params.courseId as string);
  sendResponse(res, httpStatus.OK, "Notices fetched successfully", result);
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
  getAllNotices,
  getNoticeById,
  getGlobalNotices,
  getNoticesByCourseId,
  updateNotice,
  deleteNotice,
};