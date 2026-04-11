import { Router } from "express";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.STUDENT), validateRequest(orderValidation.createOrderValidation), orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/user/:userId", orderController.getOrdersByUserId);
router.get("/:id", orderController.getOrderById);
router.patch("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(orderValidation.updateOrderValidation), orderController.updateOrder);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), orderController.deleteOrder);

export const orderRoutes = router;