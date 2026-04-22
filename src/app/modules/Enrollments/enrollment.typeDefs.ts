export const enrollmentTypeDefs = `#graphql
  type Enrollment {
    id: ID!
    userId: String!
    user: User
    courseId: String!
    course: Course
    status: String!
    enrolledAt: DateTime!
    expiresAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allEnrollments(filter: EnrollmentFilterInput, pagination: PaginationInput): PaginatedEnrollments!
    enrollment(id: ID): Enrollment
  }

  input EnrollmentFilterInput {
    userId: String
    courseId: String
    status: String
  }

  type PaginatedEnrollments {
    enrollments: [Enrollment!]!
    meta: PaginationMeta!
  }

`;