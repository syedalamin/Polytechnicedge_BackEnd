import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { courseBundleService } from "./bundle.service";
import catchAsync from "../../../Shared/catchAsync";

const createCourseBundle = catchAsync(async (req, res) => {
  const result = await courseBundleService.createCourseBundle(req.body);
  sendResponse(res, httpStatus.CREATED, "Course bundle created successfully", result);
});

const getAllCourseBundles = catchAsync(async (req, res) => {
  const filter = {
    isPublished: req.query.isPublished === "true" ? true : req.query.isPublished === "false" ? false : undefined,
    search: req.query.search as string | undefined,
  };
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  };
  const result = await courseBundleService.getAllCourseBundles(filter, paginationOptions);
  sendResponse(res, httpStatus.OK, "Course bundles fetched successfully", result);
});

const getCourseBundleById = catchAsync(async (req, res) => {
  const result = await courseBundleService.getCourseBundleById(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Course bundle fetched successfully", result);
});

const getCourseBundleBySlug = catchAsync(async (req, res) => {
  const result = await courseBundleService.getCourseBundleBySlug(req.params.slug as string);
  sendResponse(res, httpStatus.OK, "Course bundle fetched successfully", result);
});

const getPublishedBundles = catchAsync(async (req, res) => {
  const result = await courseBundleService.getPublishedBundles();
  sendResponse(res, httpStatus.OK, "Published bundles fetched successfully", result);
});

const updateCourseBundle = catchAsync(async (req, res) => {
  const result = await courseBundleService.updateCourseBundle(req.params.id as string, req.body);
  sendResponse(res, httpStatus.OK, "Course bundle updated successfully", result);
});

const addBundleItem = catchAsync(async (req, res) => {
  const { courseId, price } = req.body;
  const result = await courseBundleService.addBundleItem(req.params.id as string, courseId, price);
  sendResponse(res, httpStatus.OK, "Item added to bundle successfully", result);
});

const removeBundleItem = catchAsync(async (req, res) => {
  const result = await courseBundleService.removeBundleItem(req.params.itemId as string);
  sendResponse(res, httpStatus.OK, "Item removed from bundle successfully", result);
});

const deleteCourseBundle = catchAsync(async (req, res) => {
  const result = await courseBundleService.deleteCourseBundle(req.params.id as string);
  sendResponse(res, httpStatus.OK, "Course bundle deleted successfully", result);
});

export const courseBundleController = {
  createCourseBundle,
  getAllCourseBundles,
  getCourseBundleById,
  getCourseBundleBySlug,
  getPublishedBundles,
  updateCourseBundle,
  addBundleItem,
  removeBundleItem,
  deleteCourseBundle,
};