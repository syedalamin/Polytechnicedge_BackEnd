import { mergeTypeDefs } from "@graphql-tools/merge";
import { baseTypeDefs } from "./base.typeDefs";
import { userTypeDefs } from "../modules/Users/user.typeDefs.js";
import { adminTypeDefs } from "../modules/Admins/admin.typeDefs.js";
import { studentTypeDefs } from "../modules/Students/student.typeDefs.js";
import { instructorTypeDefs } from "../modules/Instructors/instructor.typeDefs.js";
import { categoryTypeDefs } from "../modules/Categories/category.typeDefs.js";
import { courseTypeDefs } from "../modules/Courses/course.typeDefs.js";
import { moduleTypeDefs } from "../modules/Modules/module.typeDefs.js";
import { contentTypeDefs } from "../modules/Contents/content.typeDefs.js";
import { courseInstructorTypeDefs } from "../modules/CourseInstructors/courseInstructor.typeDefs.js";
import { quizTypeDefs } from "../modules/Quizzes/quiz.typeDefs.js";
import { quizQuestionTypeDefs } from "../modules/QuizQuestions/quizQuestion.typeDefs.js";
import { quizAttemptTypeDefs } from "../modules/QuizAttempts/quizAttempt.typeDefs.js";
import { enrollmentTypeDefs } from "../modules/Enrollments/enrollment.typeDefs.js";
import { userProgressTypeDefs } from "../modules/Progress/progress.typeDefs.js";
import { orderTypeDefs } from "../modules/Orders/order.typeDefs.js";
import { paymentTypeDefs } from "../modules/Payments/payment.typeDefs.js";
import { certificateTypeDefs } from "../modules/Certificates/certificate.typeDefs.js";
import { noticeTypeDefs } from "../modules/Notices/notice.typeDefs.js";
import { courseBundleTypeDefs } from "../modules/Bundles/bundle.typeDefs.js";


export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
  adminTypeDefs,
  studentTypeDefs,
  instructorTypeDefs,
  categoryTypeDefs,
  courseTypeDefs,
  moduleTypeDefs,
  contentTypeDefs,
  courseInstructorTypeDefs,
  quizTypeDefs,
  quizQuestionTypeDefs,
  quizAttemptTypeDefs,
  enrollmentTypeDefs,
  userProgressTypeDefs,
  orderTypeDefs,
  paymentTypeDefs,
  certificateTypeDefs,
  noticeTypeDefs,
  courseBundleTypeDefs,
  
]);
