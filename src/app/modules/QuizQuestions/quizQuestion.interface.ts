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

export interface IUpdateQuizQuestion {
  question?: string;
  options?: any;
  correctAnswer?: any;
  marks?: number;
  explanation?: string;
}

export interface IQuizQuestionFilter {
  quizId?: string;
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

export interface IPaginatedQuizQuestions {
  questions: IQuizQuestion[];
  meta: IPaginationMeta;
}