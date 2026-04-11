export const courseInstructorTypeDefs = `#graphql
  type CourseInstructor {
    id: ID!
    courseId: String!
    course: Course
    instructorId: String!
    instructor: Instructor
    createdAt: DateTime!
  }

  type Query {
    allCourseInstructors(filter: CourseInstructorFilterInput, pagination: PaginationInput): PaginatedCourseInstructors!
    courseInstructor(id: ID): CourseInstructor
    courseInstructorsByCourseId(courseId: String!): [CourseInstructor!]!
  }

  input CourseInstructorFilterInput {
    courseId: String
    instructorId: String
  }

  type PaginatedCourseInstructors {
    courseInstructors: [CourseInstructor!]!
    meta: PaginationMeta!
  }

`;