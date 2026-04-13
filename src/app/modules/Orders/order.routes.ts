import { Router } from "express";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.STUDENT, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(orderValidation.createOrderValidation),
  orderController.createOrder,
);
router.patch(
  "/:id",
  auth( UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.STUDENT),
  validateRequest(orderValidation.updateOrderValidation),
  orderController.updateOrder,
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN,),
  orderController.deleteOrder,
);

export const orderRoutes = router;
