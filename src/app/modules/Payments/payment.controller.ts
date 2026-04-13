import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";
import catchAsync from "../../../Shared/catchAsync";


const createPayment = catchAsync(async (req, res) => {
  const result = await paymentService.createPayment(req);
  sendResponse(res, httpStatus.CREATED, "Payment created successfully", result);
});

const deletePayment = catchAsync(async (req, res) => {
  const result = await paymentService.deletePayment(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Payment deleted successfully", result);
});

export const paymentController = {
  createPayment,

  deletePayment,
};
