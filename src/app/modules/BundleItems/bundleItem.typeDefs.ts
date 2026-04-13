export const bundleItemTypeDefs = `#graphql
  type CourseBundleItem {
    id: ID!
    bundleId: String!
    courseId: String!
    priceAtBundleTime: Float!
    course: Course
    bundle: CourseBundle
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedBundlesItems {
    bundlesItems: [CourseBundleItem!]!
    meta: PaginationMeta!
  }

  input BundleItemFilterInput {
    bundleId: ID
  }

  input CreateBundleItemInput {
    courseId: ID!
    priceAtBundleTime: Float
  }

  type Query {
    getBundleItemsByBundleId(filter: BundleItemFilterInput, pagination: PaginationInput): PaginatedBundlesItems!
    getBundleItemById(id: ID!): CourseBundleItem
  }

   
`;
