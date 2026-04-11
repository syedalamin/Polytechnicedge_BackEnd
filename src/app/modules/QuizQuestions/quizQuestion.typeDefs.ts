export const quizQuestionTypeDefs = `#graphql
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

  type Query {
    allQuizQuestions(filter: QuizQuestionFilterInput, pagination: PaginationInput): PaginatedQuizQuestions!
    quizQuestion(id: ID): QuizQuestion
    quizQuestionsByQuizId(quizId: String!): [QuizQuestion!]!
  }

  input QuizQuestionFilterInput {
    quizId: String
    search: String
  }

  type PaginatedQuizQuestions {
    questions: [QuizQuestion!]!
    meta: PaginationMeta!
  }

`;