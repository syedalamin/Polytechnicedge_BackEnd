import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";
import catchAsync from "../../../Shared/catchAsync";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req);
  sendResponse(res, httpStatus.CREATED, "Order created successfully", result);
});

 
const updateOrder = catchAsync(async (req, res) => {
  const result = await orderService.updateOrder(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Order updated successfully", result);
});

const deleteOrder = catchAsync(async (req, res) => {
  const result = await orderService.deleteOrder(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Order deleted successfully", result);
});

export const orderController = {
  createOrder,
  updateOrder,
  deleteOrder,
};