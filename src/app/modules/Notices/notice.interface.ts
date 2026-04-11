export interface INotice {
  id: string;
  title: string;
  content: string;
  authorId: string;
  isGlobal: boolean;
  courseId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateNotice {
  title: string;
  content: string;
  authorId: string;
  isGlobal?: boolean;
  courseId?: string;
}

export interface IUpdateNotice {
  title?: string;
  content?: string;
  isGlobal?: boolean;
  courseId?: string;
}

export interface INoticeFilter {
  authorId?: string | undefined;
  isGlobal?: boolean | undefined;
  courseId?: string | undefined;
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

export interface IPaginatedNotices {
  notices: INotice[];
  meta: IPaginationMeta;
}