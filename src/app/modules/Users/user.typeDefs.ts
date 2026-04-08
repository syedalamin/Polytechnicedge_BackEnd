export const userTypeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    username: String!
    needPasswordChange: Boolean!
    role: String!
    status: String
    emailVerified: Boolean!
    twoFactorEnabled: Boolean!
    lastLogin: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedUsers {
    users: [User!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  input UserFilterInput {
    role: String
    status: String
    search: String
  }

  input PaginationInput {
    page: Int
    limit: Int
    sortBy: String
    sortOrder: SortOrder
  }

  input UpdateProfileInput {
    username: String
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  type Mutation {
    updateProfile(input: UpdateProfileInput!): User!
    changePassword(input: ChangePasswordInput!): Boolean!
  }

  type Query {
    users(filter: UserFilterInput, pagination: PaginationInput): PaginatedUsers!
    user(id: ID!): User
    searchUsers(query: String!, limit: Int): [User!]!
    me: User
  }
`;