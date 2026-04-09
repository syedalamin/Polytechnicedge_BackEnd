export interface IInstructor {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  slug: string;
  username: string;
  bio?: string | null;
  address?: string | null;
  gender?: string | null;
  expertise?: string[];
  qualification?: string | null;
  experienceYears?: number | null;
  linkedin?: string | null;
  website?: string | null;
  rating: number;
  contactNumber1?: string | null;
  contactNumber2?: string | null;
  profileImage?: string | null;
  backgroundImage?: string | null;
  suspendedReason?: string | null;
  settings?: any;
  suspendedAt?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateInstructor {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  bio?: string;
  address?: string;
  gender?: string;
  expertise?: string[];
  qualification?: string;
  experienceYears?: number;
  linkedin?: string;
  website?: string;
  contactNumber1?: string;
  contactNumber2?: string;
  profileImage?: string;
  backgroundImage?: string;
}

export interface IUpdateInstructor {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  bio?: string;
  address?: string;
  gender?: string;
  expertise?: string[];
  qualification?: string;
  experienceYears?: number;
  linkedin?: string;
  website?: string;
  contactNumber1?: string;
  contactNumber2?: string;
  profileImage?: string;
  backgroundImage?: string;
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

export interface IPaginatedInstructors {
  instructors: IInstructor[];
  meta: IPaginationMeta;
}