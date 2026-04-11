export interface IQuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  isPassed: boolean;
  answers: any;
  attemptCount: number;
  attemptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuizAttempt {
  userId: string;
  quizId: string;
  score: number;
  isPassed: boolean;
  answers: any;
  attemptCount?: number;
}

export interface IUpdateQuizAttempt {
  score?: number;
  isPassed?: boolean;
  answers?: any;
}

export interface IQuizAttemptFilter {
  userId?: string | undefined;
  quizId?: string | undefined;
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

export interface IPaginatedQuizAttempts {
  attempts: IQuizAttempt[];
  meta: IPaginationMeta;
}