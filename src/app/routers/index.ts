import express, { Router } from 'express';
import { adminRoutes } from '../modules/Admins/admin.routes.js';
import { authRoutes } from '../modules/Auth/auth.routes.js';
import { studentsRoutes } from '../modules/Students/student.routes.js';
import { instructorRoutes } from '../modules/Instructors/instructor.routes.js';

const router: Router = express.Router();

const moduleRouters = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/students',
    route: studentsRoutes,
  },
  {
    path: '/instructors',
    route: instructorRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export const Routers = router;