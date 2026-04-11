export const noticeTypeDefs = `#graphql
  type Notice {
    id: ID!
    title: String!
    content: String!
    authorId: String!
    author: User
    isGlobal: Boolean!
    courseId: String
    course: Course
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allNotices(filter: NoticeFilterInput, pagination: PaginationInput): PaginatedNotices!
    notice(id: ID): Notice
    globalNotices: [Notice!]!
    noticesByCourseId(courseId: String!): [Notice!]!
  }

  input NoticeFilterInput {
    authorId: String
    isGlobal: Boolean
    courseId: String
    search: String
  }

  type PaginatedNotices {
    notices: [Notice!]!
    meta: PaginationMeta!
  }

`;