import { z } from "zod";
import { OrderStatus } from "../../../generated/prisma/enums";

const createOrderValidation = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    totalAmount: z.number().positive({ message: "Total amount must be positive" }),
    items: z.array(z.object({
      courseId: z.string().min(1),
      price: z.number().positive(),
    })).min(1, { message: "At least one item is required" }),
  }),
});

const updateOrderValidation = z.object({
  body: z.object({
    status: z.enum(Object.values(OrderStatus)).optional(),
    transactionId: z.string().optional(),
  }),
});

export const orderValidation = {
  createOrderValidation,
  updateOrderValidation,
};