export interface ICourseInstructor {
  id: string;
  courseId: string;
  instructorId: string;
  createdAt: Date;
}

export interface ICreateCourseInstructor {
  courseId: string;
  instructorId: string;
}

export interface ICourseInstructorFilter {
  courseId?: string;
  instructorId?: string;
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

export interface IPaginatedCourseInstructors {
  courseInstructors: ICourseInstructor[];
  meta: IPaginationMeta;
}