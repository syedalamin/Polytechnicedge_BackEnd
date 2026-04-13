import { z } from "zod";
import { OrderStatus } from "../../../generated/prisma/enums";

const createOrderValidation = z.object({
  body: z.object({
    items: z.array(z.object({
      courseId: z.string().optional(),
      bundleId: z.string().optional(),
    })) ,
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