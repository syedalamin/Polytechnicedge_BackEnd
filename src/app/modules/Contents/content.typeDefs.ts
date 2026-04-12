export const contentTypeDefs = `#graphql
  type Content {
    id: ID!
    moduleId: String!
    module: Module
    title: String!
    slug: String!
    contentType: String!
    contentUrl: String
    textContent: String
    isLocked: Boolean!
    duration: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allContents(filter: ContentFilterInput, pagination: PaginationInput): PaginatedContents!
    contentBySlug(slug: String): Content
  }

  input ContentFilterInput {
    moduleId: String
    contentType: String
    search: String
  }

  type PaginatedContents {
    contents: [Content!]!
    meta: PaginationMeta!
  }

`;