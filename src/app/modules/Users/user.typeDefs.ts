export const userTypeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    username: String!
    slug: String!
    needPasswordChange: Boolean!
    role: String!
    status: String
    emailVerified: Boolean!
    twoFactorEnabled: Boolean!
    lastLogin: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    adminProfile: Admin
    instructorProfile: Instructor
    studentProfile: Student
    orders: [Order]
    payments: [Payment]
    enrollments: [Enrollment]
    userProgress: [UserProgress]
    certificates: [Certificate]
    notices: [Notice]
    quizAttempts: [QuizAttempt]
    courses: [Course]
  }

  type PaginatedUsers {
    users: [User!]!
    meta: PaginationMeta!
  }

  input UserFilterInput {
    role: String
    emailVerified: Boolean
    search: String
  }

  input PaginationInput {
    page: Int
    limit: Int
    sortBy: String
    sortOrder: SortOrder
  }


 

  type Query {
    allUsers(filter: UserFilterInput, pagination: PaginationInput): PaginatedUsers!
    user(id: ID!): User
   
  }

  
`;