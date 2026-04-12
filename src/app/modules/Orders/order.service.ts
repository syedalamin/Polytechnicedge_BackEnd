import prismaClient from "../../../config/prismaClient";
import { ICreateOrder, IUpdateOrder, IOrderFilter, IPaginationOptions, IPaginatedOrders } from "./order.interface";
import { calculatePagination } from "../../../utils/pagination";
import { OrderStatus } from "../../../generated/prisma/enums";

const createOrder = async (data: ICreateOrder) => {
  const user = await prismaClient.user.findUnique({ where: { id: data.userId } });
  if (!user) throw new Error("User not found");

  const result = await prismaClient.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        status: OrderStatus.PENDING,
      },
    });

    for (const item of data.items) {
      if (item.bundleId) {
        const bundle = await tx.courseBundle.findUnique({ where: { id: item.bundleId } });
        if (!bundle) throw new Error("Bundle not found");
      } else if (item.courseId) {
        const course = await tx.course.findUnique({ where: { id: item.courseId } });
        if (!course) throw new Error("Course not found");
      }

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          ...(item.courseId && { courseId: item.courseId }),
          ...(item.bundleId && { bundleId: item.bundleId }),
          price: item.price,
        },
      });
    }

    return order;
  });

  return result;
};

const getAllOrders = async (
  filter: IOrderFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedOrders> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.status) where.status = filter.status;

  const [result, total] = await Promise.all([
    prismaClient.order.findMany({
      where,
      include: { user: true, items: { include: { course: true, bundle: true } }, payment: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.order.count({ where }),
  ]);

  return { orders: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getOrderById = async (id: string) => {
  const result = await prismaClient.order.findUnique({
    where: { id },
    include: { user: true, items: { include: { course: true, bundle: true } }, payment: true },
  });

  return result;
};

const getOrdersByUserId = async (userId: string) => {
  const result = await prismaClient.order.findMany({
    where: { userId },
    include: { items: { include: { course: true, bundle: true } }, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

const updateOrder = async (id: string, data: IUpdateOrder) => {
  const existing = await prismaClient.order.findUnique({ where: { id } });
  if (!existing) throw new Error("Order not found");

  const result = await prismaClient.order.update({ where: { id }, data });

  return result;
};

const deleteOrder = async (id: string) => {
  const existing = await prismaClient.order.findUnique({ where: { id } });
  if (!existing) throw new Error("Order not found");

  const result = await prismaClient.order.delete({ where: { id } });

  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};