import { Router } from "express";
import { categoryController } from "./category.controller";
import { categoryValidation } from "./category.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-category",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(categoryValidation.createCategoryValidation),
  categoryController.createCategory,
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(categoryValidation.updateCategoryValidation),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  categoryController.deleteCategory,
);

export const categoryRoutes = router;
