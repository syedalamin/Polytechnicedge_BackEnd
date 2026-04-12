import prismaClient from "../../../config/prismaClient";
import { ICreatePayment, IUpdatePayment, IPaymentFilter, IPaginationOptions, IPaginatedPayments } from "./payment.interface";
import { calculatePagination } from "../../../utils/pagination";
import { PaymentStatus } from "../../../generated/prisma/enums";

const createPayment = async (data: ICreatePayment) => {
  const [user, order] = await Promise.all([
    prismaClient.user.findUnique({ where: { id: data.userId } }),
    prismaClient.order.findUnique({ where: { id: data.orderId } }),
  ]);

  if (!user) throw new Error("User not found");
  if (!order) throw new Error("Order not found");

  const existingPayment = await prismaClient.payment.findUnique({ where: { orderId: data.orderId } });
  if (existingPayment) throw new Error("Payment already exists for this order");

  const result = await prismaClient.payment.create({
    data: {
      userId: data.userId,
      orderId: data.orderId,
      amount: data.amount,
      transactionId: data.transactionId,
      paymentMethod: data.paymentMethod,
      status: PaymentStatus.PENDING,
    },
  });

  return result;
};

const getAllPayments = async (
  filter: IPaymentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedPayments> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.orderId) where.orderId = filter.orderId;
  if (filter.status) where.status = filter.status;

  const [result, total] = await Promise.all([
    prismaClient.payment.findMany({
      where,
      include: { user: true, order: { include: { items: true } } },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.payment.count({ where }),
  ]);

  return { payments: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getPaymentById = async (id: string) => {
  const result = await prismaClient.payment.findUnique({
    where: { id },
    include: { user: true, order: { include: { items: true } } },
  });

  return result;
};

const getPaymentByOrderId = async (orderId: string) => {
  const result = await prismaClient.payment.findUnique({
    where: { orderId },
    include: { user: true, order: { include: { items: true } } },
  });

  return result;
};

const updatePayment = async (id: string, data: IUpdatePayment) => {
  const existing = await prismaClient.payment.findUnique({ where: { id } });
  if (!existing) throw new Error("Payment not found");

  const result = await prismaClient.payment.update({
    where: { id },
    data: {
      ...data,
      paidAt: data.status === PaymentStatus.COMPLETED ? new Date() : existing.paidAt,
    },
  });

  return result;
};

const deletePayment = async (id: string) => {
  const existing = await prismaClient.payment.findUnique({ where: { id } });
  if (!existing) throw new Error("Payment not found");

  const result = await prismaClient.payment.delete({ where: { id } });

  return result;
};

export const paymentService = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  updatePayment,
  deletePayment,
};