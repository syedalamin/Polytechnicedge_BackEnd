import prismaClient from "../../../config/prismaClient";
import { ICreateBundleItem, IBundleItemFilter } from "./bundleItem.interface";

const createBundleItem = async (bundleId: string, data: ICreateBundleItem) => {
  const bundle = await prismaClient.courseBundle.findUnique({ where: { id: bundleId } });
  if (!bundle) throw new Error("Bundle not found");

  const course = await prismaClient.course.findUnique({ where: { id: data.courseId } });
  if (!course) throw new Error("Course not found");

  const existingItem = await prismaClient.courseBundleItem.findFirst({
    where: { bundleId, courseId: data.courseId },
  });
  if (existingItem) throw new Error("Course already in bundle");

  const result = await prismaClient.courseBundleItem.create({
    data: {
      bundleId,
      courseId: data.courseId,
      priceAtBundleTime: data.priceAtBundleTime,
    },
    include: {
      course: { include: { instructors: { include: { instructor: true } } } },
    },
  });

  return result;
};

const getBundleItemsByBundleId = async (bundleId: string) => {
  const result = await prismaClient.courseBundleItem.findMany({
    where: { bundleId },
    include: {
      course: { include: { instructors: { include: { instructor: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return result;
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

const updateBundleItem = async (id: string, priceAtBundleTime: number) => {
  const existing = await prismaClient.courseBundleItem.findUnique({ where: { id } });
  if (!existing) throw new Error("Bundle item not found");

  const result = await prismaClient.courseBundleItem.update({
    where: { id },
    data: { priceAtBundleTime },
  });

  return result;
};

const deleteBundleItem = async (id: string) => {
  const existing = await prismaClient.courseBundleItem.findUnique({ where: { id } });
  if (!existing) throw new Error("Bundle item not found");

  const result = await prismaClient.courseBundleItem.delete({ where: { id } });

  return result;
};

export const bundleItemService = {
  createBundleItem,
  getBundleItemsByBundleId,
  getBundleItemById,
  updateBundleItem,
  deleteBundleItem,
};