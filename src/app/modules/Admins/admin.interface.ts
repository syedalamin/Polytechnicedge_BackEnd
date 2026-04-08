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