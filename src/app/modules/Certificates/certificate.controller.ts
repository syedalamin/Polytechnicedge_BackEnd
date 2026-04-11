import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { certificateService } from "./certificate.service";
import catchAsync from "../../../Shared/catchAsync";

const createCertificate = catchAsync(async (req, res) => {
  const result = await certificateService.createCertificate(req.body);
  sendResponse(res, httpStatus.CREATED, "Certificate created successfully", result);
});

const getAllCertificates = catchAsync(async (req, res) => {
  const filter = {
    userId: req.query.userId as string | undefined,
    courseId: req.query.courseId as string | undefined,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await certificateService.getAllCertificates(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Certificates fetched successfully", result);
});

const getCertificateById = catchAsync(async (req, res) => {
  const result = await certificateService.getCertificateById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Certificate fetched successfully", result);
});

const getCertificatesByUserId = catchAsync(async (req, res) => {
  const result = await certificateService.getCertificatesByUserId(req.params.userId as string);
  sendResponse(res, httpStatus.OK, "Certificates fetched successfully", result);
});

const getCertificatesByCourseId = catchAsync(async (req, res) => {
  const result = await certificateService.getCertificatesByCourseId(req.params.courseId as string);
  sendResponse(res, httpStatus.OK, "Certificates fetched successfully", result);
});

const deleteCertificate = catchAsync(async (req, res) => {
  const result = await certificateService.deleteCertificate(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Certificate deleted successfully", result);
});

export const certificateController = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByUserId,
  getCertificatesByCourseId,
  deleteCertificate,
};