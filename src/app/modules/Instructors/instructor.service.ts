import prismaClient from "../../../config/prismaClient";
import { UserRole } from "../../../generated/prisma/enums";
import {
  ICreateInstructor,
  IUpdateInstructor,
  IInstructor,
  IPaginationOptions,
  IPaginatedInstructors,
} from "./instructor.interface";
import { generateUsername } from "../../../utils/generateUsername";
import { hashPassword } from "../../../utils/hashPassword";
import { calculatePagination } from "../../../utils/pagination";
import { slugGeneratorUser } from "../../../utils/slugGeneratorUser";

const createInstructor = async (
  instructorData: ICreateInstructor,
): Promise<IInstructor> => {
  const username = await generateUsername(
    instructorData.firstName,
    instructorData.middleName,
    instructorData.lastName,
  );
  const slug = await slugGeneratorUser(
    instructorData.firstName,
    instructorData.middleName,
    instructorData.lastName,
  );
  const hashedPassword = await hashPassword(instructorData.password);

  const result = await prismaClient.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: instructorData.email,
        password: hashedPassword,
        emailVerified: true,
        username,
        slug,
        role: UserRole.INSTRUCTOR,
      },
    });

    const instructor = await tx.instructorProfile.create({
      data: {
        userId: user.id,
        firstName: instructorData.firstName,
        middleName: instructorData.middleName || null,
        lastName: instructorData.lastName,
        slug,
        username,
        bio: instructorData.bio || null,
        address: instructorData.address || null,
        gender: instructorData.gender || null,
        expertise: instructorData.expertise || [],
        qualification: instructorData.qualification || null,
        experienceYears: instructorData.experienceYears || null,
        linkedin: instructorData.linkedin || null,
        website: instructorData.website || null,
        contactNumber1: instructorData.contactNumber1 || null,
        contactNumber2: instructorData.contactNumber2 || null,
        profileImage: instructorData.profileImage || null,
        backgroundImage: instructorData.backgroundImage || null,
      },
      include: {
        user: true,
        courseInstructors: true,
        sessions: true,
      },
    });

    return instructor;
  });

  return result;
};

const updateInstructorProfile = async (
  id: string,
  data: IUpdateInstructor,
): Promise<IInstructor> => {
  const result = await prismaClient.instructorProfile.update({
    where: { id },
    data: {
      ...data,
    },
    include: {
      user: true,
      courseInstructors: true,
      sessions: true,
    },
  });
  return result;
};

 

const getAllInstructors = async (
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedInstructors> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const [result, total] = await Promise.all([
    prismaClient.instructorProfile.findMany({
      include: {
        user: true,
        courseInstructors: true,
        sessions: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.instructorProfile.count(),
  ]);

  return {
    instructors: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getInstructorProfile = async (
  id: string,
): Promise<IInstructor | null> => {
  const result = await prismaClient.instructorProfile.findUnique({
    where: { id },
    include: {
      user: true,
      courseInstructors: true,
      sessions: true,
    },
  });

  return result;
};

export const instructorService = {
  createInstructor,
  updateInstructorProfile,

  getAllInstructors,
  getInstructorProfile,
};
