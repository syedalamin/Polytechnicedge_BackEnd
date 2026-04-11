import { Router } from "express";
import { moduleController } from "./module.controller";
import { moduleValidation } from "./module.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(moduleValidation.createModuleValidation),
  moduleController.createModule,
);

router.get("/", moduleController.getAllModules);

router.get("/course/:courseId", moduleController.getModulesByCourseId);

router.get("/:id", moduleController.getModuleById);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(moduleValidation.updateModuleValidation),
  moduleController.updateModule,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  moduleController.deleteModule,
);

export const moduleRoutes = router;