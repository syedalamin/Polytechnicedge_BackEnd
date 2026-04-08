import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "@graphql-tools/utils";
import { baseResolvers } from "./base.typeDefs";

export const resolvers: IResolvers = mergeResolvers([
  baseResolvers,
  // future resolvers add here
]);
