import { Router } from "express";
import { paymentController } from "./payment.controller";
import { paymentValidation } from "./payment.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.STUDENT), validateRequest(paymentValidation.createPaymentValidation), paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.get("/order/:orderId", paymentController.getPaymentByOrderId);
router.get("/:id", paymentController.getPaymentById);
router.patch("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(paymentValidation.updatePaymentValidation), paymentController.updatePayment);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), paymentController.deletePayment);

export const paymentRoutes = router;