import { GraphQLError } from "graphql";



export const graphqlErrorResponse = (message: string, code: string) => {
  throw new GraphQLError(message, {
    extensions: { code: code },
  });
};

