export const categoryTypeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    slug: String!
    description: String
    courses: [Course!]
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