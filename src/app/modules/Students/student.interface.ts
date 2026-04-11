export interface IStudentProfile {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  bio?: string | null;
  address?: string | null;
  gender?: string | null;
  profileImage?: string | null;
  backgroundImage?: string | null;
  contactNumber1?: string | null;
  contactNumber2?: string | null;
  educationLevel?: string | null;
  interests: string[];
  dateOfBirth?: Date | null;
  sessionBookings?: any[]; // Replace with actual type if available
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateStudent {
  email: string;
  username: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  bio?: string;
  address?: string;
  gender?: string;
  profileImage?: string;
  backgroundImage?: string;
  contactNumber1?: string;
  contactNumber2?: string;
  educationLevel?: string;
  interests?: string[];
  dateOfBirth?: string;
}

export interface IUpdateStudentProfile {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  bio?: string;
  address?: string;
  gender?: string;
  profileImage?: string;
  backgroundImage?: string;
  contactNumber1?: string;
  contactNumber2?: string;
  educationLevel?: string;
  interests?: string[];
  dateOfBirth?: string;
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

export interface IPaginatedStudents {
  students: IStudentProfile[];
  meta: IPaginationMeta;
}