import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { bundleItemService } from "./bundleItem.service";
import catchAsync from "../../../Shared/catchAsync";

const createBundleItem = catchAsync(async (req, res) => {
  const result = await bundleItemService.createBundleItem(req.params.bundleId as string, req.body);
  sendResponse(res, httpStatus.CREATED, "Bundle item created successfully", result);
});

const getBundleItemsByBundleId = catchAsync(async (req, res) => {
  const result = await bundleItemService.getBundleItemsByBundleId(req.params.bundleId as string);
  sendResponse(res, httpStatus.OK, "Bundle items fetched successfully", result);
});

const getBundleItemById = catchAsync(async (req, res) => {
  const result = await bundleItemService.getBundleItemById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Bundle item fetched successfully", result);
});

const updateBundleItem = catchAsync(async (req, res) => {
  const result = await bundleItemService.updateBundleItem(req.params.id as string, req.body.priceAtBundleTime);
  sendResponse(res, httpStatus.OK, "Bundle item updated successfully", result);
});

const deleteBundleItem = catchAsync(async (req, res) => {
  const result = await bundleItemService.deleteBundleItem(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Bundle item deleted successfully", result);
});

export const bundleItemController = {
  createBundleItem,
  getBundleItemsByBundleId,
  getBundleItemById,
  updateBundleItem,
  deleteBundleItem,
};