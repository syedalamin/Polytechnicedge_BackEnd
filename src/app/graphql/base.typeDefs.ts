export const baseTypeDefs = `#graphql
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