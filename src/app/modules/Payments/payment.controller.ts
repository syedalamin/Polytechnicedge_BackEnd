import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";
import catchAsync from "../../../Shared/catchAsync";

const createPayment = catchAsync(async (req, res) => {
  const result = await paymentService.createPayment(req.body);
  sendResponse(res, httpStatus.CREATED, "Payment created successfully", result);
});

const getAllPayments = catchAsync(async (req, res) => {
  const filter = {
    userId: req.query.userId as string | undefined,
    orderId: req.query.orderId as string | undefined,
    status: req.query.status as any,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await paymentService.getAllPayments(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Payments fetched successfully", result);
});

const getPaymentById = catchAsync(async (req, res) => {
  const result = await paymentService.getPaymentById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Payment fetched successfully", result);
});

const getPaymentByOrderId = catchAsync(async (req, res) => {
  const result = await paymentService.getPaymentByOrderId(req.params.orderId as string);
  sendResponse(res, httpStatus.OK, "Payment fetched successfully", result);
});

const updatePayment = catchAsync(async (req, res) => {
  const result = await paymentService.updatePayment(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Payment updated successfully", result);
});

const deletePayment = catchAsync(async (req, res) => {
  const result = await paymentService.deletePayment(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Payment deleted successfully", result);
});

export const paymentController = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  updatePayment,
  deletePayment,
};