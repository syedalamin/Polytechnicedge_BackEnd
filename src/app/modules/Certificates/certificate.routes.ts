import { Router } from "express";
import { certificateController } from "./certificate.controller";
import { certificateValidation } from "./certificate.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(certificateValidation.createCertificateValidation), certificateController.createCertificate);
router.get("/", certificateController.getAllCertificates);
router.get("/user/:userId", certificateController.getCertificatesByUserId);
router.get("/course/:courseId", certificateController.getCertificatesByCourseId);
router.get("/:id", certificateController.getCertificateById);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), certificateController.deleteCertificate);

export const certificateRoutes = router;