import { z } from "zod";
import { PaymentStatus } from "../../../generated/prisma/enums";

const createPaymentValidation = z.object({
  body: z.object({
    orderId: z.string().min(1, { message: "Order ID is required" }),
    transactionId: z.string().min(1, { message: "Transaction ID is required" }),
    paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  }),
});

const initiateRefundValidation = z.object({
  body: z.object({
    refund_amount: z.number().min(0, { message: "Refund amount must be positive" }),
    refund_remarks: z.string().min(1, { message: "Refund remarks are required" }),
    bank_tran_id: z.string().min(1, { message: "Bank transaction ID is required" }),
    refe_id: z.string().min(1, { message: "Reference ID is required" }),
  }),
});

const queryRefundValidation = z.object({
  body: z.object({
    refund_ref_id: z.string().min(1, { message: "Refund reference ID is required" }),
  }),
});

export const paymentValidation = {
  createPaymentValidation,
  initiateRefundValidation,
  queryRefundValidation,
};
