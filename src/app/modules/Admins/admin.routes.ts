import { Router } from 'express';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminValidation),
  adminController.createAdmin
);
router.delete('/:id', adminController.deleteAdmin);
router.put(
  '/:id',
  validateRequest(adminValidation.updateAdminValidation),
  adminController.updateAdminProfile
);

export const adminRoutes = router;