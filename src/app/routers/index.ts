import express, { Router } from "express";
import { adminRoutes } from "../modules/Admins/admin.routes.js";
import { authRoutes } from "../modules/Auth/auth.routes.js";
import { studentsRoutes } from "../modules/Students/student.routes.js";
import { instructorRoutes } from "../modules/Instructors/instructor.routes.js";
import { categoryRoutes } from "../modules/Categories/category.routes.js";
import { courseRoutes } from "../modules/Courses/course.routes.js";
import { moduleRoutes } from "../modules/Modules/module.routes.js";
import { contentRoutes } from "../modules/Contents/content.routes.js";
import { courseInstructorRoutes } from "../modules/CourseInstructors/courseInstructor.routes.js";
import { quizRoutes } from "../modules/Quizzes/quiz.routes.js";
import { quizQuestionRoutes } from "../modules/QuizQuestions/quizQuestion.routes.js";
import { quizAttemptRoutes } from "../modules/QuizAttempts/quizAttempt.routes.js";
import { enrollmentRoutes } from "../modules/Enrollments/enrollment.routes.js";
import { userProgressRoutes } from "../modules/Progress/progress.routes.js";
import { orderRoutes } from "../modules/Orders/order.routes.js";
import { paymentRoutes } from "../modules/Payments/payment.routes.js";
import { certificateRoutes } from "../modules/Certificates/certificate.routes.js";
import { noticeRoutes } from "../modules/Notices/notice.routes.js";
import { bundleRoutes } from "../modules/Bundles/bundle.routes.js";
import { bundleItemRoutes } from "../modules/BundleItems/bundleItem.routes.js";

const router: Router = express.Router();

const moduleRouters = [
  { path: "/auth", route: authRoutes },
  { path: "/admins", route: adminRoutes },
  { path: "/students", route: studentsRoutes },
  { path: "/instructors", route: instructorRoutes },
  { path: "/categories", route: categoryRoutes },
  { path: "/courses", route: courseRoutes },
  { path: "/modules", route: moduleRoutes },
  { path: "/contents", route: contentRoutes },
  { path: "/course-instructors", route: courseInstructorRoutes },
  { path: "/quizzes", route: quizRoutes },
  { path: "/quiz-questions", route: quizQuestionRoutes },
  { path: "/quiz-attempts", route: quizAttemptRoutes },
  { path: "/enrollments", route: enrollmentRoutes },
  { path: "/progress", route: userProgressRoutes },
  { path: "/orders", route: orderRoutes },
  { path: "/payments", route: paymentRoutes },
  { path: "/certificates", route: certificateRoutes },
  { path: "/notices", route: noticeRoutes },
  { path: "/bundles", route: bundleRoutes },
  { path: "/bundle-items", route: bundleItemRoutes },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export const Routers = router;
