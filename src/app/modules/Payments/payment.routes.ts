import { Router } from "express";
import { paymentController } from "./payment.controller";
import { paymentValidation } from "./payment.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(paymentValidation.createPaymentValidation),
  paymentController.createPayment,
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.deletePayment,
);

export const paymentRoutes = router;
