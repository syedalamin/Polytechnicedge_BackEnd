import { mergeTypeDefs } from "@graphql-tools/merge";
import { baseTypeDefs } from "./base.typeDefs";
import { userTypeDefs } from "../modules/Users/user.typeDefs.js";
 

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
]);
