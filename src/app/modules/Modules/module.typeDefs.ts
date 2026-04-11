export const moduleTypeDefs = `#graphql
  type Module {
    id: ID!
    courseId: String!
    course: Course
    weekNumber: Int!
    title: String!
    slug: String!
    textInstruction: String
    estimatedDuration: Int!
    contents: [Content]
    quizzes: [Quiz]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allModules(filter: ModuleFilterInput, pagination: PaginationInput): PaginatedModules!
    module(id: ID): Module
    moduleBySlug(slug: String): Module
    modulesByCourseId(courseId: String!): [Module!]!
  }

  input ModuleFilterInput {
    courseId: String
    search: String
  }

  type PaginatedModules {
    modules: [Module!]!
    meta: PaginationMeta!
  }

`;