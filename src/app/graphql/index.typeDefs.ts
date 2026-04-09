import { mergeTypeDefs } from "@graphql-tools/merge";
import { baseTypeDefs } from "./base.typeDefs";
import { userTypeDefs } from "../modules/Users/user.typeDefs.js";
import { adminTypeDefs } from "../modules/Admins/admin.typeDefs.js";
import { studentTypeDefs } from "../modules/Students/student.typeDefs.js";
import { instructorTypeDefs } from "../modules/Instructors/instructor.typeDefs.js";

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
  adminTypeDefs,
  studentTypeDefs,
  instructorTypeDefs,
]);
