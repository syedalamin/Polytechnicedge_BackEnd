import { mergeTypeDefs } from "@graphql-tools/merge";
import { baseTypeDefs } from "./base.typeDefs";
 

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  // future modules add here
]);
