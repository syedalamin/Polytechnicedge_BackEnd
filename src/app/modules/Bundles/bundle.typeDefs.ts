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

  type CourseBundleItem {
    id: ID!
    bundleId: String!
    bundle: CourseBundle
    courseId: String!
    course: Course
    price: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allBundles(filter: BundleFilterInput, pagination: PaginationInput): PaginatedBundles!
    bundle(id: ID): CourseBundle
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