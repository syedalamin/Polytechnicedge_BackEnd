import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";
import catchAsync from "../../../Shared/catchAsync";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req.body);
  sendResponse(res, httpStatus.CREATED, "Order created successfully", result);
});

const getAllOrders = catchAsync(async (req, res) => {
  const filter = {
    userId: req.query.userId as string | undefined,
    status: req.query.status as any,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await orderService.getAllOrders(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Orders fetched successfully", result);
});

const getOrderById = catchAsync(async (req, res) => {
  const result = await orderService.getOrderById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Order fetched successfully", result);
});

const getOrdersByUserId = catchAsync(async (req, res) => {
  const result = await orderService.getOrdersByUserId(req.params.userId as string);
  sendResponse(res, httpStatus.OK, "Orders fetched successfully", result);
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
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};