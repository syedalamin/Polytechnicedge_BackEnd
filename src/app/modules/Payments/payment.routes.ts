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


router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getAllPayments,
);


router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getPaymentById,
);


router.get(
  "/order/:orderId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getPaymentByOrderId,
);


router.get(
  "/user/:userId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getPaymentByUserId,
);


router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.deletePayment,
);


router.post(
  "/success",
  paymentController.sslSuccess,
);


router.post(
  "/fail",
  paymentController.sslFail,
);


router.post(
  "/cancel",
  paymentController.sslCancel,
);


router.post(
  "/ipn",
  paymentController.sslIPN,
);


router.post(
  "/refund/initiate",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.initiateRefund,
);


router.post(
  "/refund/query",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.queryRefund,
);


router.get(
  "/transaction/:tranId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.queryTransactionByTranId,
);

export const paymentRoutes = router;
