export const courseTypeDefs = `#graphql
  type Course {
    id: ID!
    title: String!
    slug: String!
    shortDescription: String
    longDescription: String
    thumbnail: String
    previewVideoUrl: String
    price: Float!
    isPublished: Boolean!
    isFeatured: Boolean!
    level: String!
    categoryId: String!
    category: Category
    authorId: String
    author: User
    durationHours: Float
    whatYouWillLearn: [String!]!
    requirements: [String!]!
    prerequisites: [String!]!
    tags: [String!]!
    accessExpiresInDays: Int!
    modules: [Module!]
    enrollments: [Enrollment]
    orderItems: [OrderItem]
    userProgress: [UserProgress]
    certificates: [Certificate]
    notices: [Notice]
    instructors: [CourseInstructor]
    bundleItems: [CourseBundleItem]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedCourses {
    courses: [Course!]
    meta: PaginationMeta!
  }

  input CourseFilterInput {
    categoryId: String
    level: String
    isFeatured: Boolean
    isPublished: Boolean
    search: String
  }

  type Query {
    allCourses(filter: CourseFilterInput, pagination: PaginationInput): PaginatedCourses!
    course(slug: String): Course
    featuredCourses: [Course!]!
    publishedCourses(filter: CourseFilterInput, pagination: PaginationInput): PaginatedCourses!
  }


`;