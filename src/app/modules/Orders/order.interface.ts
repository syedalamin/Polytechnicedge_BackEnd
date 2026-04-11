import { OrderStatus } from "../../../generated/prisma/enums";

export interface IOrder {
  id: string;
  userId: string;
  totalAmount: any;
  status: OrderStatus;
  transactionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOrder {
  userId: string;
  totalAmount: number;
  items: { courseId: string; price: number }[];
}

export interface IUpdateOrder {
  status?: OrderStatus;
  transactionId?: string;
}

export interface IOrderFilter {
  userId?: string | undefined;
  status?: OrderStatus | undefined;
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

export interface IPaginatedOrders {
  orders: IOrder[];
  meta: IPaginationMeta;
}