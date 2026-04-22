import prismaClient from "../../../config/prismaClient";
import {  IEnrollmentFilter, IPaginationOptions, IPaginatedEnrollments } from "./enrollment.interface";
import { calculatePagination } from "../../../utils/pagination";
 



const getAllEnrollments = async (
  filter: IEnrollmentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedEnrollments> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.courseId) where.courseId = filter.courseId;
  if (filter.status) where.status = filter.status;

  const [result, total] = await Promise.all([
    prismaClient.enrollment.findMany({
      where,
      include: { user: true, course: true, orderItem: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.enrollment.count({ where }),
  ]);

  return { enrollments: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getEnrollmentById = async (id: string) => {
  const result = await prismaClient.enrollment.findUnique({
    where: { id },
    include: { user: true, course: true, orderItem: true },
  });

  return result;
};

 

export const enrollmentService = {

  getAllEnrollments,
  getEnrollmentById,
 
};