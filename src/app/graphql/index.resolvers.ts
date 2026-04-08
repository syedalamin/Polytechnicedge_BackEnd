import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "@graphql-tools/utils";
import { baseResolvers } from "./base.typeDefs";
import { userResolvers } from "../modules/Users/user.resolvers.js";

export const resolvers: IResolvers = mergeResolvers([
  baseResolvers,
  userResolvers,
]);
