export const userProgressTypeDefs = `#graphql
  type UserProgress {
    id: ID!
    userId: String!
    user: User
    courseId: String!
    course: Course
    progress: Float!
    isCompleted: Boolean!
    completedContents: [String!]
    currentContentId: String
    lastAccessed: DateTime
    completedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allUserProgress(filter: UserProgressFilterInput, pagination: PaginationInput): PaginatedUserProgress!
    userProgress(id: ID): UserProgress
    userProgressByUserId(userId: String!): [UserProgress!]!
    userProgressByCourseId(courseId: String!): [UserProgress!]!
    userProgressByUserAndCourse(userId: String!, courseId: String!): UserProgress
  }

  input UserProgressFilterInput {
    userId: String
    courseId: String
  }

  type PaginatedUserProgress {
    progressList: [UserProgress!]!
    meta: PaginationMeta!
  }

`;