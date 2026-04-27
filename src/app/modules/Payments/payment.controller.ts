import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";
import catchAsync from "../../../Shared/catchAsync";

const createPayment = catchAsync(async (req, res) => {
  const result = await paymentService.createPayment(req);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Payment initialized successfully",
    result,
  );
});

const getAllPayments = catchAsync(async (req, res) => {
  const filter = req.query as any;
  const paginationOptions = req.query as any;
  const result = await paymentService.getAllPayments(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Payments retrieved successfully", result);
});

const getPaymentById = catchAsync(async (req, res) => {
  const result = await paymentService.getPaymentById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Payment retrieved successfully", result);
});

const getPaymentByOrderId = catchAsync(async (req, res) => {
  const result = await paymentService.getPaymentByOrderId(
    req.params.orderId as string,
  );
  sendResponse(res, httpStatus.OK, "Payment retrieved successfully", result);
});

const getPaymentByUserId = catchAsync(async (req, res) => {
  const result = await paymentService.getPaymentByUserId(
    req.params.userId as string,
  );
  sendResponse(res, httpStatus.OK, "Payments retrieved successfully", result);
});

const deletePayment = catchAsync(async (req, res) => {
  const result = await paymentService.deletePayment(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Payment deleted successfully", result);
});

const sslSuccess = catchAsync(async (req, res) => {
  const result = await paymentService.sslSuccess(req);
  sendResponse(res, httpStatus.OK, "Payment success handled", result);
});

const sslFail = catchAsync(async (req, res) => {
  const result = await paymentService.sslFail(req);
  sendResponse(res, httpStatus.OK, "Payment failure handled", result);
});

const sslCancel = catchAsync(async (req, res) => {
  const result = await paymentService.sslCancel(req);
  sendResponse(res, httpStatus.OK, "Payment cancellation handled", result);
});

const sslIPN = catchAsync(async (req, res) => {
  const result = await paymentService.sslIPN(req);
  sendResponse(res, httpStatus.OK, "IPN processed successfully", result);
});

const initiateRefund = catchAsync(async (req, res) => {
  const result = await paymentService.initiateRefund(req.body);
  sendResponse(res, httpStatus.OK, "Refund initiated successfully", result);
});

const queryRefund = catchAsync(async (req, res) => {
  const result = await paymentService.queryRefund(req.body);
  sendResponse(res, httpStatus.OK, "Refund status retrieved", result);
});

const queryTransactionByTranId = catchAsync(async (req, res) => {
  const result = await paymentService.queryTransactionByTranId({
    tran_id: req.params.tranId as string,
  });
  sendResponse(res, httpStatus.OK, "Transaction details retrieved", result);
});

export const paymentController = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  getPaymentByUserId,
  deletePayment,
  sslSuccess,
  sslFail,
  sslCancel,
  sslIPN,
  initiateRefund,
  queryRefund,
  queryTransactionByTranId,
};
