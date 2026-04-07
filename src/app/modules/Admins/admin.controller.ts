import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../../config/prismaClient';
import { sendResponse } from '../../../Shared/sendResponse';

export const adminController = {
  getDashboardStats: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [totalUsers, totalStudents, totalInstructors, totalAdmins, recentUsers] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: 'STUDENT' } }),
        prisma.user.count({ where: { role: 'INSTRUCTOR' } }),
        prisma.user.count({ where: { role: 'ADMIN' } }),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
        }),
      ]);

      return sendResponse(res, 200, 'Dashboard stats retrieved', {
        totalUsers,
        totalStudents,
        totalInstructors,
        totalAdmins,
        recentUsers,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, search, role } = req.query as { page?: number; limit?: number; search?: string; role?: string };

      const skip = (page - 1) * limit;
      const where: Record<string, unknown> = {};
      if (role) where.role = role;
      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({ where, skip, take: limit, select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, createdAt: true } }),
        prisma.user.count({ where }),
      ]);

      return sendResponse(res, 200, 'Users retrieved', {
        users,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.update({ where: { id }, data: req.body });

      return sendResponse(res, 200, 'User updated successfully', user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id } });

      return sendResponse(res, 200, 'User deleted successfully', null);
    } catch (error) {
      next(error);
    }
  },
};
