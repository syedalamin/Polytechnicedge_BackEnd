import { CourseLevel } from "../../../generated/prisma/enums";

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  thumbnail: string | null;
  previewVideoUrl: string | null;
  price: any;
  isPublished: boolean;
  isFeatured: boolean;
  level: CourseLevel;
  categoryId: string;
  durationHours: number | null;
  whatYouWillLearn: string[];
  requirements: string[];
  prerequisites: string[];
  tags: string[];
  accessExpiresInDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCourse {
  title: string;
  shortDescription?: string;
  longDescription?: string;
  thumbnail?: string;
  previewVideoUrl?: string;
  price: number;
  level?: CourseLevel;
  categoryId: string;
  durationHours?: number;
  whatYouWillLearn?: string[];
  requirements?: string[];
  prerequisites?: string[];
  tags?: string[];
  accessExpiresInDays?: number;
}

export interface IUpdateCourse {
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  thumbnail?: string;
  previewVideoUrl?: string;
  price?: number;
  level?: CourseLevel;
  categoryId?: string;
  durationHours?: number;
  whatYouWillLearn?: string[];
  requirements?: string[];
  prerequisites?: string[];
  tags?: string[];
  accessExpiresInDays?: number;
}

export interface ICourseFilter {
  categoryId?: string;
  level?: CourseLevel;
  isFeatured?: boolean;
  isPublished?: boolean;
  search?: string;
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

export interface IPaginatedCourses {
  courses: ICourse[];
  meta: IPaginationMeta;
}