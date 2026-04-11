import prismaClient from "../../../config/prismaClient";
import { ICreateCertificate, ICertificateFilter, IPaginationOptions, IPaginatedCertificates } from "./certificate.interface";
import { calculatePagination } from "../../../utils/pagination";

const createCertificate = async (data: ICreateCertificate) => {
  const [user, course] = await Promise.all([
    prismaClient.user.findUnique({ where: { id: data.userId } }),
    prismaClient.course.findUnique({ where: { id: data.courseId } }),
  ]);

  if (!user) throw new Error("User not found");
  if (!course) throw new Error("Course not found");

  const existing = await prismaClient.certificate.findFirst({
    where: { userId: data.userId, courseId: data.courseId },
  });
  if (existing) throw new Error("Certificate already exists for this user and course");

  const result = await prismaClient.certificate.create({
    data: {
      userId: data.userId,
      courseId: data.courseId,
      certificateUrl: data.certificateUrl,
      issuedAt: new Date(),
    },
  });

  return result;
};

const getAllCertificates = async (
  filter: ICertificateFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedCertificates> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.courseId) where.courseId = filter.courseId;

  const [result, total] = await Promise.all([
    prismaClient.certificate.findMany({
      where,
      include: { user: true, course: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.certificate.count({ where }),
  ]);

  return { certificates: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getCertificateById = async (id: string) => {
  const result = await prismaClient.certificate.findUnique({
    where: { id },
    include: { user: true, course: true },
  });

  return result;
};

const getCertificatesByUserId = async (userId: string) => {
  const result = await prismaClient.certificate.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { issuedAt: "desc" },
  });

  return result;
};

const getCertificatesByCourseId = async (courseId: string) => {
  const result = await prismaClient.certificate.findMany({
    where: { courseId },
    include: { user: true },
    orderBy: { issuedAt: "desc" },
  });

  return result;
};

const deleteCertificate = async (id: string) => {
  const existing = await prismaClient.certificate.findUnique({ where: { id } });
  if (!existing) throw new Error("Certificate not found");

  const result = await prismaClient.certificate.delete({ where: { id } });

  return result;
};

export const certificateService = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByUserId,
  getCertificatesByCourseId,
  deleteCertificate,
};