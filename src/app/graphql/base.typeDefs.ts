export const baseTypeDefs = `#graphql
  enum SortOrder {
    asc
    desc
  }

  scalar DateTime
  scalar Json

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type PaginationMeta {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }
`;
export const baseResolvers = {
  Query: {
    _empty: () => "ok",
  },
  Mutation: {
    _empty: () => "ok",
  },
  Json: {
    __parseValue(value: any) {
      return JSON.stringify(value);
    },
    __serialize(value: any) {
      return value;
    },
  },
};
