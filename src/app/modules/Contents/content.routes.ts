import { Router } from "express";
import { contentController } from "./content.controller";
import { contentValidation } from "./content.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(contentValidation.createContentValidation),
  contentController.createContent,
);

router.get("/", contentController.getAllContents);

router.get("/module/:moduleId", contentController.getContentsByModuleId);

router.get("/:id", contentController.getContentById);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(contentValidation.updateContentValidation),
  contentController.updateContent,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  contentController.deleteContent,
);

export const contentRoutes = router;