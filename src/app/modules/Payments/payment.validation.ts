import { z } from "zod";
import { PaymentStatus } from "../../../generated/prisma/enums";

const createPaymentValidation = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    orderId: z.string().min(1, { message: "Order ID is required" }),
    amount: z.number().positive({ message: "Amount must be positive" }),
    transactionId: z.string().min(1, { message: "Transaction ID is required" }),
    paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  }),
});

const updatePaymentValidation = z.object({
  body: z.object({
    status: z.enum(Object.values(PaymentStatus)).optional(),
    paidAt: z.string().optional(),
  }),
});

export const paymentValidation = {
  createPaymentValidation,
  updatePaymentValidation,
};