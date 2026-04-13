 
export interface ICourseBundle {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: any;
  isPublished: boolean;
  items: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCourseBundle {
  title: string;
  description: string;
  price: number;
  isPublished?: boolean;
  items?: { courseId: string; priceAtBundleTime: number }[];
}
export interface IUpdateCourseBundle {
  description: string;
  price: number;
  isPublished?: boolean;
  items?: { courseId: string; }[];
  removeItems?: string[];
}



export interface ICourseBundleFilter {
  isPublished?: boolean | undefined;
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

export interface IPaginatedCourseBundles {
  bundles: ICourseBundle[];
  meta: IPaginationMeta;
}