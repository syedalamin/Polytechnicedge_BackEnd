import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "@graphql-tools/utils";
import { baseResolvers } from "./base.typeDefs";
import { userResolvers } from "../modules/Users/user.resolvers.js";
import { adminResolvers } from "../modules/Admins/admin.resolvers.js";
import { studentResolvers } from "../modules/Students/student.resolvers.js";

export const resolvers: IResolvers = mergeResolvers([
  baseResolvers,
  userResolvers,
  adminResolvers,
  studentResolvers,
]);
