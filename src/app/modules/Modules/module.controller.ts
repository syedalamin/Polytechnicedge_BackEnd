import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { moduleService } from "./module.service";
import catchAsync from "../../../Shared/catchAsync";

const createModule = catchAsync(async (req, res) => {
  const result = await moduleService.createModule(req.body);
  sendResponse(
    res,
    httpStatus.CREATED,
    "Module created successfully",
    result,
  );
});

 

const updateModule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await moduleService.updateModule(id, req.body);
  sendResponse(
    res,
    httpStatus.OK,
    "Module updated successfully",
    result,
  );
});

const deleteModule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await moduleService.deleteModule(id);
  sendResponse(
    res,
    httpStatus.OK,
    "Module deleted successfully",
    result,
  );
});

export const moduleController = {
  createModule,
  
  updateModule,
  deleteModule,
};