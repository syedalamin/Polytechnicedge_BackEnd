import express, { Router } from 'express';
import { adminRoutes } from '../modules/Admins/admin.routes.js';

const router: Router = express.Router();

const moduleRouters = [
  {
    path: '/admins',
    route: adminRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export const Routers = router;