import { Router } from 'express';
import { adminController } from './admin.controller';

const router = Router();

router.post('/create-admin', adminController.createAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.put('/:id', adminController.updateAdminProfile);

export const adminRoutes = router;