import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { certificateService } from "./certificate.service";
import catchAsync from "../../../Shared/catchAsync";

const createCertificate = catchAsync(async (req, res) => {
  const result = await certificateService.createCertificate(req.body);
  sendResponse(res, httpStatus.CREATED, "Certificate created successfully", result);
});

 
const deleteCertificate = catchAsync(async (req, res) => {
  const result = await certificateService.deleteCertificate(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Certificate deleted successfully", result);
});

export const certificateController = {
  createCertificate,
  deleteCertificate,
};