export interface ICertificate {
  id: string;
  userId: string;
  courseId: string;
  certificateUrl: string;
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCertificate {
  userId: string;
  courseId: string;
  certificateUrl: string;
}

export interface ICertificateFilter {
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

export interface IPaginatedCertificates {
  certificates: ICertificate[];
  meta: IPaginationMeta;
}