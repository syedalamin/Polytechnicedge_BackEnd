import { Router } from "express";
import { bundleItemController } from "./bundleItem.controller";
import { bundleItemValidation } from "./bundleItem.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/bundles/:bundleId/items",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(bundleItemValidation.createBundleItemValidation),
  bundleItemController.createBundleItem
);
router.get("/bundles/:bundleId/items", bundleItemController.getBundleItemsByBundleId);
router.get("/items/:id", bundleItemController.getBundleItemById);
router.patch(
  "/items/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(bundleItemValidation.updateBundleItemValidation),
  bundleItemController.updateBundleItem
);
router.delete(
  "/items/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  bundleItemController.deleteBundleItem
);

export const bundleItemRoutes = router;