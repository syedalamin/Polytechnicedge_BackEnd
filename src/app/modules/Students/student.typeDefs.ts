export const studentTypeDefs = `#graphql
  type Student {
    id: ID!
    userId: String!
    username: String!
    slug: String!
    firstName: String!
    middleName: String
    lastName: String!
    bio: String
    address: String
    gender: String
    profileImage: String
    backgroundImage: String
    contactNumber1: String
    contactNumber2: String
    educationLevel: String
    interests: [String!]
    dateOfBirth: DateTime
    user: User!
    sessionBookings: [SessionBooking]
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
