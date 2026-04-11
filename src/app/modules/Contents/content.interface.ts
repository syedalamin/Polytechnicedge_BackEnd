import { ContentType } from "../../../generated/prisma/enums";

export interface IContent {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  contentType: ContentType;
  contentUrl: string | null;
  textContent: string | null;
  isLocked: boolean;
  duration: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateContent {
  moduleId: string;
  title: string;
  contentType: ContentType;
  contentUrl?: string;
  textContent?: string;
  isLocked?: boolean;
  duration?: number;
}

export interface IUpdateContent {
  title?: string;
  contentType?: ContentType;
  contentUrl?: string;
  textContent?: string;
  isLocked?: boolean;
  duration?: number;
}

export interface IContentFilter {
  moduleId?: string;
  contentType?: ContentType;
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

export interface IPaginatedContents {
  contents: IContent[];
  meta: IPaginationMeta;
}