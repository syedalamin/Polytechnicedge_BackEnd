export const adminTypeDefs = `
  type Admin {
    id: ID!
    userId: String!
    firstName: String!
    middleName: String
    lastName: String!
    bio: String
    address: String
    dateOfBirth: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateAdminInput {
    userId: String!
    firstName: String!
    middleName: String
    lastName: String!
    bio: String
    address: String
    dateOfBirth: String
  }

  input UpdateAdminInput {
    firstName: String
    middleName: String
    lastName: String
    bio: String
    address: String
    dateOfBirth: String
  }

  type Query {
    admin(id: ID!): Admin
    admins: [Admin!]!
    adminByEmail(email: String!): Admin
    adminProfile(id: ID!): Admin
  }

  type Mutation {
    createAdmin(input: CreateAdminInput!): Admin!
    deleteAdmin(id: ID!): Admin!
    updateAdminProfile(id: ID!, input: UpdateAdminInput!): Admin!
  }
`;