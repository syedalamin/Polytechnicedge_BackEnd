export interface IUserProgress {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  isCompleted: boolean;
  completedContents: string[];
  currentContentId: string | null;
  lastAccessed: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserProgress {
  userId: string;
  courseId: string;
  progress?: number;
}

export interface IUpdateUserProgress {
  courseId: string,
  isCompleted: boolean
}

export interface IUserProgressFilter {
  userId?: string | undefined;
  courseId?: string | undefined;
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

export interface IPaginatedUserProgress {
  progressList: IUserProgress[];
  meta: IPaginationMeta;
}