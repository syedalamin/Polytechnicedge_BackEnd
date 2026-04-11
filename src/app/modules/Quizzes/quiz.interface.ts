export interface IQuiz {
  id: string;
  moduleId: string;
  title: string;
  isAdaptive: boolean;
  isLocked: boolean;
  timeLimit: number;
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuiz {
  moduleId: string;
  title: string;
  isAdaptive?: boolean;
  isLocked?: boolean;
  timeLimit?: number;
  passingScore?: number;
}

export interface IUpdateQuiz {
  title?: string;
  isAdaptive?: boolean;
  isLocked?: boolean;
  timeLimit?: number;
  passingScore?: number;
}

export interface IQuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: any;
  correctAnswer: any;
  marks: number;
  explanation: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuizQuestion {
  quizId: string;
  question: string;
  options: any;
  correctAnswer: any;
  marks: number;
  explanation?: string;
}

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

export interface IQuizFilter {
  moduleId?: string | undefined;
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

export interface IPaginatedQuizzes {
  quizzes: IQuiz[];
  meta: IPaginationMeta;
}