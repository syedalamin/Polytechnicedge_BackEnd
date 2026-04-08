export const baseTypeDefs = `#graphql
  enum SortOrder {
    asc
    desc
  }

  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
export const baseResolvers = {
  Query: {
    _empty: () => "ok",
  },
  Mutation: {
    _empty: () => "ok",
  },
};