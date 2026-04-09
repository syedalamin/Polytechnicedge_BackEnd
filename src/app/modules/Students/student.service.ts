import prismaClient from "../../../config/prismaClient";
import {
  IUpdateStudentProfile,
  IPaginationOptions,
  IPaginatedStudents,
  ICreateStudent,
} from "./student.interface";
import { calculatePagination } from "../../../utils/pagination";
import redis from "../../../utils/redis";
import { generateUsername } from "../../../utils/generateUsername";
import { hashPassword } from "../../../utils/hashPassword";
import { UserRole } from "../../../generated/prisma/enums";
import { slugGeneratorUser } from "../../../utils/slugGeneratorUser";

const createStudentProfile = async (studentData: ICreateStudent) => {
  const username = await generateUsername(
    studentData.firstName,
    studentData.middleName,
    studentData.lastName,
  );
  const slug = await slugGeneratorUser(
    studentData.firstName,
    studentData.middleName,
    studentData.lastName,
  );
  const hashedPassword = await hashPassword(studentData.password);

  const result = await prismaClient.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: studentData.email,
        username,
        slug,
        password: hashedPassword,
        role: UserRole.STUDENT,
      },
    });

    const student = await tx.studentProfile.create({
      data: {
        userId: user.id,
        firstName: studentData.firstName,
        middleName: studentData.middleName || null,
        lastName: studentData.lastName,
        slug,
        username,
        bio: studentData.bio || null,
        address: studentData.address || null,
        gender: studentData.gender || null,
        profileImage: studentData.profileImage || null,
        backgroundImage: studentData.backgroundImage || null,
        contactNumber1: studentData.contactNumber1 || null,
        contactNumber2: studentData.contactNumber2 || null,
        educationLevel: studentData.educationLevel || null,
        interests: studentData.interests || [],
        dateOfBirth: studentData.dateOfBirth
          ? new Date(studentData.dateOfBirth)
          : null,
      },
    });

    return student;
  });

  return result;
};

const updateStudentProfile = async (
  id: string,
  data: IUpdateStudentProfile,
) => {
  const result = await prismaClient.studentProfile.update({
    where: { id },
    data: {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
    },
  });
  await redis.del(`students:${result.id}`);
  return result;
};

const deleteStudentProfile = async (id: string) => {
  const result = await prismaClient.studentProfile.delete({
    where: { id },
  });

  await redis.del(`students:${result.id}`);

  return result;
};

const getAllStudents = async (
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedStudents> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const [result, total] = await Promise.all([
    prismaClient.studentProfile.findMany({
      include: {
        user: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.studentProfile.count(),
  ]);

  return {
    students: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getStudentProfile = async (id: string) => {
  const cacheKey = `students:${id}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const result = await prismaClient.studentProfile.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (result) {
    await redis.set(cacheKey, result, 600);
  }
  return result;
};

export const studentsService = {
  createStudentProfile,
  getStudentProfile,

  updateStudentProfile,
  deleteStudentProfile,
  getAllStudents,
};
