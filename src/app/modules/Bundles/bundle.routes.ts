import { Router } from "express";
import { courseBundleController } from "./bundle.controller";
import { courseBundleValidation } from "./bundle.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(courseBundleValidation.createCourseBundleValidation), courseBundleController.createCourseBundle);
router.get("/", courseBundleController.getAllCourseBundles);
router.get("/published", courseBundleController.getPublishedBundles);
router.get("/slug/:slug", courseBundleController.getCourseBundleBySlug);
router.get("/:id", courseBundleController.getCourseBundleById);
router.patch("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(courseBundleValidation.updateCourseBundleValidation), courseBundleController.updateCourseBundle);
router.post("/:id/items", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(courseBundleValidation.addBundleItemValidation), courseBundleController.addBundleItem);
router.delete("/:id/items/:itemId", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), courseBundleController.removeBundleItem);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), courseBundleController.deleteCourseBundle);

export const bundleRoutes = router;