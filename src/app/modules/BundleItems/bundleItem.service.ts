import prismaClient from "../../../config/prismaClient";
import { ICreateBundleItem } from "./bundleItem.interface.js";
import { calculatePagination } from "../../../utils/pagination";

 

const getBundleItemsByBundleId = async (bundleId: string, pagination: { page: number; limit: number }) => {
  const { page, limit, skip } = calculatePagination(pagination);

  const [result, total] = await Promise.all([
    prismaClient.courseBundleItem.findMany({
      where: { bundleId },
      include: {
        course: { include: { instructors: { include: { instructor: true } } } },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prismaClient.courseBundleItem.count({ where: { bundleId } }),
  ]);

  return {
    bundlesItems: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getBundleItemById = async (id: string) => {
  const result = await prismaClient.courseBundleItem.findUnique({
    where: { id },
    include: {
      course: { include: { instructors: { include: { instructor: true } } } },
      bundle: true,
    },
  });

  return result;
};
 
export const bundleItemService = {
 
  getBundleItemsByBundleId,
  getBundleItemById,
 
};