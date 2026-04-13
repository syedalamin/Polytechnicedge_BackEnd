export interface ICourseBundleItem {
  id: string;
  bundleId: string;
  courseId: string;
  priceAtBundleTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBundleItem {
  courseId: string;
  priceAtBundleTime?: number;
}

export interface IBundleItemFilter {
  bundleId?: string;
  courseId?: string;
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

export interface IPaginatedBundleItems {
  bundlesItems: ICourseBundleItem[];
  meta: IPaginationMeta;
}