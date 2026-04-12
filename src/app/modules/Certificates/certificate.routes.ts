import { Router } from "express";
import { certificateController } from "./certificate.controller";
import { certificateValidation } from "./certificate.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/create-certificate", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(certificateValidation.createCertificateValidation), certificateController.createCertificate);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), certificateController.deleteCertificate);

export const certificateRoutes = router;