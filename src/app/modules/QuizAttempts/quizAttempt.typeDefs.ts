export const quizAttemptTypeDefs = `#graphql
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
    submissions: [QuizAttemptSubmission]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type QuizAttemptSubmission {
    id: ID!
    quizAttemptId: String!
    quizAttempt: QuizAttempt
    userId: String!
    user: User
    textAnswer: String
    marks: Float
    feedback: String
    totalMarks: Float
    submittedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allQuizAttempts(filter: QuizAttemptFilterInput, pagination: PaginationInput): PaginatedQuizAttempts!
    quizAttempt(id: ID): QuizAttempt
    quizAttemptsByQuizId(quizId: String!): [QuizAttempt!]!
    quizAttemptsByUserId(userId: String!): [QuizAttempt!]!
  }

  input QuizAttemptFilterInput {
    userId: String
    quizId: String
  }

  type PaginatedQuizAttempts {
    attempts: [QuizAttempt!]!
    meta: PaginationMeta!
  }

`;