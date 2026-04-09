export const studentTypeDefs = `#graphql
  type Student {
    id: ID!
    userId: String!
    firstName: String!
    middleName: String
    lastName: String!
    bio: String
    address: String
    educationLevel: String
    interests: [String!]!
    dateOfBirth: DateTime
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedStudents {
    students: [Student!]!
    meta: PaginationMeta!
  }

  type Query {
    studentProfile(id: ID!): Student
    getAllStudents(pagination: PaginationInput): PaginatedStudents!
  }
`;