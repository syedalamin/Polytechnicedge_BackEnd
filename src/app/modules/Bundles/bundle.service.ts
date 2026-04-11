import prismaClient from "../../../config/prismaClient";
import { ICreateCourseBundle, IUpdateCourseBundle, ICourseBundleFilter, IPaginationOptions, IPaginatedCourseBundles } from "./bundle.interface";
import { calculatePagination } from "../../../utils/pagination";
import { generateUniqueSlug } from "../../../utils/slugGenerator";

const createCourseBundle = async (data: ICreateCourseBundle) => {
  const slug = await generateUniqueSlug(data.title, { model: "courseBundle" });

  const result = await prismaClient.$transaction(async (tx) => {
    const bundle = await tx.courseBundle.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        price: data.price,
        isPublished: data.isPublished ?? false,
      },
    });

    if (data.items && data.items.length > 0) {
      for (const item of data.items) {
        await tx.courseBundleItem.create({
          data: {
            bundleId: bundle.id,
            courseId: item.courseId,
            price: item.price,
          },
        });
      }
    }

    return bundle;
  });

  return result;
};

const getAllCourseBundles = async (
  filter: ICourseBundleFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedCourseBundles> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.isPublished !== undefined) where.isPublished = filter.isPublished;
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { description: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.courseBundle.findMany({
      where,
      include: { items: { include: { course: true } } },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.courseBundle.count({ where }),
  ]);

  return { bundles: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getCourseBundleById = async (id: string) => {
  const result = await prismaClient.courseBundle.findUnique({
    where: { id },
    include: { items: { include: { course: true } } },
  });

  return result;
};

const getCourseBundleBySlug = async (slug: string) => {
  const result = await prismaClient.courseBundle.findUnique({
    where: { slug },
    include: { items: { include: { course: true } } },
  });

  return result;
};

const getPublishedBundles = async () => {
  const result = await prismaClient.courseBundle.findMany({
    where: { isPublished: true },
    include: { items: { include: { course: true } } },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

const updateCourseBundle = async (id: string, data: IUpdateCourseBundle) => {
  const existing = await prismaClient.courseBundle.findUnique({ where: { id } });
  if (!existing) throw new Error("Course bundle not found");

  const result = await prismaClient.courseBundle.update({ where: { id }, data });

  return result;
};

const addBundleItem = async (bundleId: string, courseId: string, price: number) => {
  const bundle = await prismaClient.courseBundle.findUnique({ where: { id: bundleId } });
  if (!bundle) throw new Error("Bundle not found");

  const course = await prismaClient.course.findUnique({ where: { id: courseId } });
  if (!course) throw new Error("Course not found");

  const existingItem = await prismaClient.courseBundleItem.findFirst({
    where: { bundleId, courseId },
  });
  if (existingItem) throw new Error("Course already in bundle");

  const result = await prismaClient.courseBundleItem.create({
    data: { bundleId, courseId, price },
  });

  return result;
};

const removeBundleItem = async (itemId: string) => {
  const existing = await prismaClient.courseBundleItem.findUnique({
    where: { id: itemId },
    include: { bundle: true },
  });
  if (!existing) throw new Error("Bundle item not found");

  const result = await prismaClient.courseBundleItem.delete({ where: { id: itemId } });

  return result;
};

const deleteCourseBundle = async (id: string) => {
  const existing = await prismaClient.courseBundle.findUnique({ where: { id } });
  if (!existing) throw new Error("Course bundle not found");

  const result = await prismaClient.courseBundle.delete({ where: { id } });

  return result;
};

export const courseBundleService = {
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