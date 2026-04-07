export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | null;
  meta?: Record<string, unknown>;
}

export interface IErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errorDetails?: unknown;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
