import type { Request, Response } from "express";
import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { adminService } from "./admin.service";
import catchAsync from "../../../Shared/catchAsync";
import { getPaginationOptions } from "../../../utils/pagination";

export const createAdmin = catchAsync(async (req, res) => {
  const result = await adminService.createAdmin(req.body);
  sendResponse(res, httpStatus.OK, "Admin created successfully", result);
});

 

export const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await adminService.deleteAdmin(id);
  sendResponse(res, httpStatus.OK, "Admin deleted successfully", result);
});

export const updateAdminProfile = catchAsync(
  async (req, res) => {
    const id = req.params.id as string;
    const result = await adminService.updateAdminProfile(id, req.body);
    sendResponse(
      res,
      httpStatus.OK,
      "Admin profile updated successfully",
      result,
    );
  },
);

export const adminController = {
  createAdmin,
 
  deleteAdmin,
  updateAdminProfile,
};
