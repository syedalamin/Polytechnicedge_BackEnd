export interface IModule {
  id: string;
  courseId: string;
  weekNumber: number;
  title: string;
  slug: string;
  textInstruction: string | null;
  estimatedDuration: number;
  contents: any[];
  quizzes: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateModule {
  courseId: string;
  weekNumber: number;
  title: string;
  textInstruction?: string;
  estimatedDuration: number;
}

export interface IUpdateModule {
  weekNumber?: number;
  title?: string;
  textInstruction?: string;
  estimatedDuration?: number;
}

export interface IModuleFilter {
  courseId?: string;
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

export interface IPaginatedModules {
  modules: IModule[];
  meta: IPaginationMeta;
}
