export const adminTypeDefs = `#graphql
  type Admin {
    id: ID!
    userId: String!
    username: String!
    slug: String!
    firstName: String!
    middleName: String
    lastName: String!
    bio: String
    user: User!
    address: String
    dateOfBirth: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginationMeta {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  type PaginatedAdmins {
    admins: [Admin!]!
    meta: PaginationMeta!
  }

  type Query {
    admin(id: ID!): Admin
    getAllAdmins(pagination: PaginationInput): PaginatedAdmins!
    adminByEmail(email: String!): Admin
    adminProfile(id: ID!): Admin
  }
   
`;