export interface IAdmin {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  bio?: string | null;
  address?: string | null;
  dateOfBirth?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAdmin {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  bio?: string;
  address?: string;
  dateOfBirth?: string;
}

export interface IUpdateAdmin {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  bio?: string;
  address?: string;
  dateOfBirth?: Date;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedAdmins {
  admins: IAdmin[];
  meta: IPaginationMeta;
}