import { z } from "zod";
import { PaymentStatus } from "../../../generated/prisma/enums";

const createPaymentValidation = z.object({
  body: z.object({
    orderId: z.string().min(1, { message: "Order ID is required" }),
    transactionId: z.string().min(1, { message: "Transaction ID is required" }),
    paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  }),
});

 

export const paymentValidation = {
  createPaymentValidation,
 
};