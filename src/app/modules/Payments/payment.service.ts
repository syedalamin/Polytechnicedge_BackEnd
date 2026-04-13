import prismaClient from "../../../config/prismaClient";
import {
  ICreatePayment,
  IPaymentFilter,
  IPaginationOptions,
  IPaginatedPayments,
} from "./payment.interface";
import { calculatePagination } from "../../../utils/pagination";
import {
  PaymentStatus,
  OrderStatus,
  EnrollmentStatus,
} from "../../../generated/prisma/enums";
import { Request } from "express";

const createPayment = async (req: Request) => {
  const { userId } = req.user as {
    userId: string;
    username: string;
    email: string;
    role: string;
  };
  const data = req.body as ICreatePayment;
  const [user, order] = await Promise.all([
    prismaClient.user.findUnique({ where: { id: userId } }),
    prismaClient.order.findUnique({
      where: { id: data.orderId },
      include: { items: true },
    }),
  ]);

  if (!user) throw new Error("User not found");
  if (!order) throw new Error("Order not found");

  const existingPayment = await prismaClient.payment.findUnique({
    where: { orderId: data.orderId },
  });
  if (existingPayment) throw new Error("Payment already exists for this order");

  const payment = await prismaClient.payment.create({
    data: {
      userId: user.id,
      orderId: order.id,
      amount: order.totalAmount,
      transactionId: data.transactionId,
      paymentMethod: data.paymentMethod,
      status: PaymentStatus.COMPLETED,
      paidAt: new Date(),
    },
  });

  await prismaClient.order.update({
    where: { id: order.id },
    data: {
      status: OrderStatus.PAID,
      transactionId: data.transactionId,
    },
  });

  for (const item of order.items) {
    if (item.courseId) {
      await prismaClient.enrollment.create({
        data: {
          userId: user.id,
          courseId: item.courseId,
          orderItemId: item.id,
          status: EnrollmentStatus.ACTIVE,
          enrolledAt: new Date(),
        },
      });
    } else if (item.bundleId) {
      const bundle = await prismaClient.courseBundle.findUnique({
        where: { id: item.bundleId },
        include: { items: true },
      });
      if (bundle) {
        for (const bundleItem of bundle.items) {
          await prismaClient.enrollment.create({
            data: {
              userId: user.id,
              courseId: bundleItem.courseId,
              orderItemId: item.id,
              status: EnrollmentStatus.ACTIVE,
              enrolledAt: new Date(),
            },
          });
        }
      }
    }
  }

  return payment;
};

const getAllPayments = async (
  filter: IPaymentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedPayments> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
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

  return {
    payments: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
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
const getPaymentByUserId = async (userId: string) => {
  const result = await prismaClient.payment.findMany({
    where: { userId},
    include: { user: true, order: { include: { items: true } } },
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
  deletePayment,
  getPaymentByUserId
};
