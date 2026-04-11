import { UserRole } from "../../../generated/prisma/enums";

export interface IUser {
  id: string;
  email: string;
  username: string;
  slug: string;
  role: UserRole;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
  adminProfile?: any;
  instructorProfile?: any;
  studentProfile?: any;
  orders?: any[];
  payments?: any[];
  enrollments?: any[];
  userProgress?: any[];
  certificates?: any[];
  notices?: any[];
  quizAttempts?: any[];
  courses?: any[];
}

export interface ICreateUser {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
}

export interface IUpdateUser {
  email?: string;
  username?: string;
  role?: UserRole;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  status?: string;
}

export interface IUserFilter {
  role?: UserRole | undefined;
  emailVerified?: boolean | undefined;
  search?: string | undefined;
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

export interface IPaginatedUsers {
  users: IUser[];
  meta: IPaginationMeta;
}