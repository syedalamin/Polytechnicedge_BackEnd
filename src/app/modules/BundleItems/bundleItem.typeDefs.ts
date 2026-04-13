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

  type Query {
    getBundleItemsByBundleId(bundleId: ID!): [CourseBundleItem!]!
    getBundleItemById(id: ID!): CourseBundleItem
  }

  input CreateBundleItemInput {
    courseId: ID!
    priceAtBundleTime: Float!
  }

  type Mutation {
    createBundleItem(bundleId: ID!, data: CreateBundleItemInput!): CourseBundleItem!
    updateBundleItem(id: ID!, priceAtBundleTime: Float!): CourseBundleItem!
    deleteBundleItem(id: ID!): CourseBundleItem!
  }
`;