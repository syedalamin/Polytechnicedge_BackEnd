import { Router } from 'express';
import { adminController } from './admin.controller';
import { auth } from '../../middlewares/auth';
import { adminAuth } from '../../middlewares/adminAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';

const router = Router();

router.use(auth, adminAuth);

router.get('/dashboard', adminController.getDashboardStats);
router.get('/users', validateRequest(adminValidation.paginationSchema), adminController.getAllUsers);
router.patch('/users/:id', validateRequest(adminValidation.updateUserSchema), adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

export const adminRoutes = router;
