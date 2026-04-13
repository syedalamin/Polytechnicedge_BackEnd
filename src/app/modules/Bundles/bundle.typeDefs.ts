export const courseBundleTypeDefs = `#graphql
  type CourseBundle {
    id: ID!
    title: String!
    slug: String!
    description: String!
    price: Float!
    isPublished: Boolean!
    items: [CourseBundleItem!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

 
  type Query {
    allBundles(filter: BundleFilterInput, pagination: PaginationInput): PaginatedBundles!
    bundleBySlug(slug: String): CourseBundle
    publishedBundles: [CourseBundle!]!
  }

  input BundleFilterInput {
    isPublished: Boolean
    search: String
  }

  type PaginatedBundles {
    bundles: [CourseBundle!]!
    meta: PaginationMeta!
  }

`;