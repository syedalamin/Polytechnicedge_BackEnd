export const adminTypeDefs = `#graphql
  type Admin {
    id: ID!
    userId: String!
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