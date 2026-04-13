import prismaClient from "../../../config/prismaClient";
import {
  ICreateCourseBundle,
  ICourseBundleFilter,
  IPaginationOptions,
  IPaginatedCourseBundles,
} from "./bundle.interface";
import { calculatePagination } from "../../../utils/pagination";
import { generateUniqueSlug } from "../../../utils/slugGenerator";

const createCourseBundle = async (data: ICreateCourseBundle) => {
  const slug = await generateUniqueSlug(data.title, { model: "courseBundle" });

  let bundlePrice = data.price;

  if (data.items && data.items.length > 0) {
    const courses = await prismaClient.course.findMany({
      where: { id: { in: data.items.map((item) => item.courseId) } },
      select: { id: true, price: true },
    });

    const coursePriceMap = new Map(courses.map((c) => [c.id, Number(c.price)]));

    const itemPrices = data.items.map((item) => {
      const coursePrice = coursePriceMap.get(item.courseId) || 0;
      return coursePrice;
    });

    bundlePrice = itemPrices.reduce((sum, price) => sum + price, 0);
  }

  const result = await prismaClient.$transaction(async (tx) => {
    const bundle = await tx.courseBundle.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        price: bundlePrice || 0,
        isPublished: data.isPublished ?? false,
      },
    });

    if (data.items && data.items.length > 0) {
      for (const item of data.items) {
        const course = await tx.course.findUnique({
          where: { id: item.courseId },
          select: { price: true },
        });
        const coursePrice = course ? Number(course.price) : 0;

        await tx.courseBundleItem.create({
          data: {
            bundleId: bundle.id,
            courseId: item.courseId,
            priceAtBundleTime: coursePrice,
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
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
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
      include: {
        items: {
          include: {
            course: {
              include: { instructors: { include: { instructor: true } } },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.courseBundle.count({ where }),
  ]);

  return {
    bundles: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getCourseBundleBySlug = async (slug: string) => {
  const result = await prismaClient.courseBundle.findUnique({
    where: { slug },
    include: {
      items: {
        include: {
          course: {
            include: { instructors: { include: { instructor: true } } },
          },
        },
      },
    },
  });

  return result;
};

const getPublishedBundles = async () => {
  const result = await prismaClient.courseBundle.findMany({
    where: { isPublished: true },
    include: {
      items: {
        include: {
          course: {
            include: { instructors: { include: { instructor: true } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

const deleteCourseBundle = async (id: string) => {
  const existing = await prismaClient.courseBundle.findUnique({
    where: { id },
  });
  if (!existing) throw new Error("Course bundle not found");

  await prismaClient.courseBundleItem.deleteMany({ where: { bundleId: id } });

  const result = await prismaClient.courseBundle.delete({ where: { id } });

  return result;
};

export const courseBundleService = {
  createCourseBundle,
  getAllCourseBundles,
  getCourseBundleBySlug,
  getPublishedBundles,

  deleteCourseBundle,
};
