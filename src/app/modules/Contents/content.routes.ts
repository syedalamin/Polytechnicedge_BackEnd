import { Router } from "express";
import { contentController } from "./content.controller";
import { contentValidation } from "./content.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-content",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.INSTRUCTOR),
  validateRequest(contentValidation.createContentValidation),
  contentController.createContent,
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.INSTRUCTOR),
  validateRequest(contentValidation.updateContentValidation),
  contentController.updateContent,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  contentController.deleteContent,
);

export const contentRoutes = router;
