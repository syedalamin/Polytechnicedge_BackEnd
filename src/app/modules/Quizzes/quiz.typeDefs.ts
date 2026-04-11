export const quizTypeDefs = `#graphql
  type Quiz {
    id: ID!
    moduleId: String!
    module: Module
    title: String!
    isAdaptive: Boolean!
    isLocked: Boolean!
    timeLimit: Int!
    passingScore: Float!
    questions: [QuizQuestion!]
    attempts: [QuizAttempt!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type QuizQuestion {
    id: ID!
    quizId: String!
    quiz: Quiz
    question: String!
    options: String!
    correctAnswer: String!
    marks: Int!
    explanation: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type QuizAttempt {
    id: ID!
    userId: String!
    user: User
    quizId: String!
    quiz: Quiz
    score: Int!
    isPassed: Boolean!
    answers: String!
    attemptCount: Int!
    attemptedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allQuizzes(filter: QuizFilterInput, pagination: PaginationInput): PaginatedQuizzes!
    quiz(id: ID): Quiz
    quizzesByModuleId(moduleId: String!): [Quiz!]!
  }

  input QuizFilterInput {
    moduleId: String
    search: String
  }

  type PaginatedQuizzes {
    quizzes: [Quiz!]!
    meta: PaginationMeta!
  }

`;