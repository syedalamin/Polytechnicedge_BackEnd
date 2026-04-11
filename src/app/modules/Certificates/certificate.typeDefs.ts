export const certificateTypeDefs = `#graphql
  type Certificate {
    id: ID!
    userId: String!
    user: User
    courseId: String!
    course: Course
    certificateUrl: String!
    issuedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allCertificates(filter: CertificateFilterInput, pagination: PaginationInput): PaginatedCertificates!
    certificate(id: ID): Certificate
    certificatesByUserId(userId: String!): [Certificate!]!
    certificatesByCourseId(courseId: String!): [Certificate!]!
  }

  input CertificateFilterInput {
    userId: String
    courseId: String
  }

  type PaginatedCertificates {
    certificates: [Certificate!]!
    meta: PaginationMeta!
  }

`;