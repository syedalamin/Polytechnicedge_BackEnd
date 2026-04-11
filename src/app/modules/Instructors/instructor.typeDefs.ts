export const instructorTypeDefs = `#graphql
  type Instructor {
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
    dateOfBirth: DateTime
    expertise: [String!]
    qualification: String
    experienceYears: Int
    linkedin: String
    website: String
    rating: Float!
    contactNumber1: String
    contactNumber2: String
    profileImage: String
    backgroundImage: String
    user: User!
    sessions: [Session]
    courseInstructors: [CourseInstructor]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Session {
    id: ID!
    instructorId: String!
    instructor: Instructor
    title: String!
    description: String
    startTime: DateTime!
    endTime: DateTime!
    status: String!
    maxParticipants: Int!
    bookings: [SessionBooking]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type SessionBooking {
    id: ID!
    sessionId: String!
    session: Session
    userId: String!
    user: User
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedInstructors {
    instructors: [Instructor!]!
    meta: PaginationMeta!
  }

  input PaginationInput {
    page: Int
    limit: Int
    sortBy: String
    sortOrder: SortOrder
  }

  type Query {
    instructor(id: ID!): Instructor
    getAllInstructors(pagination: PaginationInput): PaginatedInstructors!
    instructorProfile(id: ID!): Instructor
  }

  type Mutation {
    createInstructor(input: CreateInstructorInput!): Instructor!
    updateInstructor(id: ID!, input: UpdateInstructorInput!): Instructor!
    deleteInstructor(id: ID!): Instructor!
  }

  input CreateInstructorInput {
    email: String!
    password: String!
    firstName: String!
    middleName: String
    lastName: String!
    bio: String
    address: String
    gender: String
    dateOfBirth: DateTime
    expertise: [String!]
    qualification: String
    experienceYears: Int
    linkedin: String
    website: String
    contactNumber1: String
    contactNumber2: String
    profileImage: String
    backgroundImage: String
  }

  input UpdateInstructorInput {
    firstName: String
    middleName: String
    lastName: String
    bio: String
    address: String
    gender: String
    dateOfBirth: DateTime
    expertise: [String!]
    qualification: String
    experienceYears: Int
    linkedin: String
    website: String
    contactNumber1: String
    contactNumber2: String
    profileImage: String
    backgroundImage: String
  }
`;