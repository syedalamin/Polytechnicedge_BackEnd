export const paymentTypeDefs = `#graphql
  type Payment {
    id: ID!
    userId: String!
    user: User
    orderId: String!
    order: Order
    amount: Float!
    transactionId: String!
    paymentMethod: String!
    status: String!
    paidAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allPayments(filter: PaymentFilterInput, pagination: PaginationInput): PaginatedPayments!
    payment(id: ID): Payment
    paymentByOrderId(orderId: String!): Payment
  }

  input PaymentFilterInput {
    userId: String
    orderId: String
    status: String
  }

  type PaginatedPayments {
    payments: [Payment!]!
    meta: PaginationMeta!
  }

`;