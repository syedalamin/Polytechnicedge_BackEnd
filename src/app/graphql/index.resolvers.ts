import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "@graphql-tools/utils";
import { baseResolvers } from "./base.typeDefs";
import { userResolvers } from "../modules/Users/user.resolvers.js";
import { adminResolvers } from "../modules/Admins/admin.resolvers.js";
import { studentResolvers } from "../modules/Students/student.resolvers.js";
import { instructorResolvers } from "../modules/Instructors/instructor.resolvers.js";
import { categoryResolvers } from "../modules/Categories/category.resolvers.js";
import { courseResolvers } from "../modules/Courses/course.resolvers.js";
import { moduleResolvers } from "../modules/Modules/module.resolvers.js";
import { contentResolvers } from "../modules/Contents/content.resolvers.js";
import { courseInstructorResolvers } from "../modules/CourseInstructors/courseInstructor.resolvers.js";
import { quizResolvers } from "../modules/Quizzes/quiz.resolvers.js";
import { quizQuestionResolvers } from "../modules/QuizQuestions/quizQuestion.resolvers.js";
import { quizAttemptResolvers } from "../modules/QuizAttempts/quizAttempt.resolvers.js";
import { enrollmentResolvers } from "../modules/Enrollments/enrollment.resolvers.js";
import { userProgressResolvers } from "../modules/Progress/progress.resolvers.js";
import { orderResolvers } from "../modules/Orders/order.resolvers.js";
import { paymentResolvers } from "../modules/Payments/payment.resolvers.js";
import { certificateResolvers } from "../modules/Certificates/certificate.resolvers.js";
import { noticeResolvers } from "../modules/Notices/notice.resolvers.js";
import { courseBundleResolvers } from "../modules/Bundles/bundle.resolvers.js";


export const resolvers: IResolvers = mergeResolvers([
  baseResolvers,
  userResolvers,
  adminResolvers,
  studentResolvers,
  instructorResolvers,
  categoryResolvers,
  courseResolvers,
  moduleResolvers,
  contentResolvers,
  courseInstructorResolvers,
  quizResolvers,
  quizQuestionResolvers,
  quizAttemptResolvers,
  enrollmentResolvers,
  userProgressResolvers,
  orderResolvers,
  paymentResolvers,
  certificateResolvers,
  noticeResolvers,
  courseBundleResolvers,
  
]);
