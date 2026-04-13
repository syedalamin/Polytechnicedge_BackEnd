export const orderTypeDefs = `#graphql
  type Order {
    id: ID!
    userId: String!
    user: User
    totalAmount: Float!
    status: String!
    transactionId: String
    items: [OrderItem!]
    payment: Payment
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type OrderItem {
    id: ID!
    orderId: String!
    order: Order
    courseId: String
    course: Course
    bundleId: String
    bundle: CourseBundle
    price: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Payment {
    id: ID!
    orderId: String!
    order: Order
    userId: String!
    user: User
    amount: Float!
    transactionId: String!
    paymentMethod: String!
    status: String!
    paidAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }



  type PaginationMeta {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  type Query {
    allOrders(filter: OrderFilterInput, pagination: PaginationInput): PaginatedOrders!
    order(id: ID): Order
    ordersByUserId(userId: String!): [Order!]!
  }

  input OrderFilterInput {
    userId: String
    status: String
  }

  type PaginatedOrders {
    orders: [Order!]!
    meta: PaginationMeta!
  }

`;