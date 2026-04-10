export const categoryTypeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    slug: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedCategories {
    categories: [Category!]!
    meta: PaginationMeta!
  }

  type Query {
    getAllCategories(pagination: PaginationInput): PaginatedCategories!
    categoryBySlug(slug: String): Category
  }


`;