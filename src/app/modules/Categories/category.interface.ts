export interface ICategory {
  id: string;
  name: string;
  slug: string;
  courses: any[]; // Replace with actual Course type when defined
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategory {
  name: string;
  description?: string;
}

export interface IUpdateCategory {
  name?: string;
  description?: string;
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

export interface IPaginatedCategories {
  categories: ICategory[];
  meta: IPaginationMeta;
}