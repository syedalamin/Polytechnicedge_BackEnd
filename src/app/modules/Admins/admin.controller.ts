import type { Request, Response } from 'express';
import { sendResponse } from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import { adminService } from './admin.service';

const createAdmin = async (req: Request, res: Response) => {
  const result = await adminService.createAdmin(req.body);
  sendResponse(res, httpStatus.OK, 'Admin created successfully', result);
};

const deleteAdmin = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await adminService.deleteAdmin(id);
  sendResponse(res, httpStatus.OK, 'Admin deleted successfully', result);
};

const updateAdminProfile = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await adminService.updateAdminProfile(id, req.body);
  sendResponse(res, httpStatus.OK, 'Admin profile updated successfully', result);
};

export const adminController = {
  createAdmin,
  deleteAdmin,
  updateAdminProfile,
};