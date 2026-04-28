import { PaymentStatus } from "../../../generated/prisma/enums";

export interface IPayment {
  id: string;
  userId: string;
  orderId: string;
  amount: any;
  transactionId: string;
  valId: string | null;
  bankTranId: string | null;
  paymentGateway: any | null;
  status: PaymentStatus;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentWithOrder extends IPayment {
  order: {
    id: string;
    items: any[];
  };
}

export interface ICreatePayment {
  orderId: string;
}

export interface IUpdatePayment {
  status?: PaymentStatus;
  paidAt?: Date;
}

export interface IPaymentFilter {
  userId?: string | undefined;
  orderId?: string | undefined;
  status?: PaymentStatus | undefined;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedPayments {
  payments: IPayment[];
  meta: IPaginationMeta;
}