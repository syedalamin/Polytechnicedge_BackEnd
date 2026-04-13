import { EnrollmentStatus } from "../../../generated/prisma/enums";

export interface IEnrollment {
  id: string;
  userId: string;
  courseId: string;
  orderItemId: string | null;
  status: EnrollmentStatus;
  enrolledAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateEnrollment {
  userId: string;
  courseId: string;
  orderItemId?: string;
  expiresAt?: Date;
}

export interface IUpdateEnrollment {
  status?: EnrollmentStatus;
  expiresAt?: Date;
}

export interface IEnrollmentFilter {
  userId?: string | undefined;
  courseId?: string | undefined;
  status?: EnrollmentStatus | undefined;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedEnrollments {
  enrollments: IEnrollment[];
  meta: IPaginationMeta;
}