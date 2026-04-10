import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./category.service";
import catchAsync from "../../../Shared/catchAsync";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Category created successfully",
    result,
  );
});

const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await categoryService.updateCategory(id, req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Category updated successfully",
    result,
  );
});

const deleteCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await categoryService.deleteCategory(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Category deleted successfully",
    result,
  );
});



export const categoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
};