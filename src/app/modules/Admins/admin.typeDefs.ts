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
    gender: String
    profileImage: String
    backgroundImage: String
    contactNumber1: String
    contactNumber2: String
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
    getAllAdmins(pagination: PaginationInput): PaginatedAdmins!
    adminProfile(id: ID!): Admin
  }
   
`;