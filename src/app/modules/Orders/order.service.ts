import prismaClient from "../../../config/prismaClient";
import {
  ICreateOrder,
  IUpdateOrder,
  IOrderFilter,
  IPaginationOptions,
  IPaginatedOrders,
} from "./order.interface";
import { calculatePagination } from "../../../utils/pagination";
import { OrderStatus } from "../../../generated/prisma/enums";
import { Request } from "express";

const createOrder = async (req: Request) => {
  const data = req.body as ICreateOrder;
  const { userId } = req.user as {
    userId: string;
    username: string;
    email: string;
    role: string;
  };
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");

  let totalAmount = 0;

  const result = await prismaClient.$transaction(async (tx) => {
    for (const item of data.items) {
      if (item.bundleId) {
        const bundle = await tx.courseBundle.findUnique({
          where: { id: item.bundleId },
        });
        if (!bundle) throw new Error("Bundle not found");
        totalAmount += Number(bundle.price);
      } else if (item.courseId) {
        const course = await tx.course.findUnique({
          where: { id: item.courseId },
        });
        if (!course) throw new Error("Course not found");
        totalAmount += Number(course.price);
      }
    }

    const order = await tx.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: OrderStatus.PENDING,
      },
    });

    for (const item of data.items) {
      let itemPrice = 0;

      if (item.bundleId) {
        const bundle = await tx.courseBundle.findUnique({
          where: { id: item.bundleId },
        });
        itemPrice = bundle ? Number(bundle.price) : 0;
      } else if (item.courseId) {
        const course = await tx.course.findUnique({
          where: { id: item.courseId },
        });
        itemPrice = course ? Number(course.price) : 0;
      }

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          ...(item.courseId && { courseId: item.courseId }),
          ...(item.bundleId && { bundleId: item.bundleId }),
          price: itemPrice,
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
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.status) where.status = filter.status;

  const [result, total] = await Promise.all([
    prismaClient.order.findMany({
      where,
      include: {
        user: true,
        items: {
          include: {
            course: { include: { modules: { include: { contents: true } } } },
            bundle: {
              include: {
                items: {
                  include: {
                    course: {
                      include: { modules: { include: { contents: true } } },
                    },
                  },
                },
              },
            },
          },
        },
        payment: true,
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.order.count({ where }),
  ]);

  return {
    orders: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getOrderById = async (id: string) => {
  const result = await prismaClient.order.findUnique({
    where: { id },
    include: {
      user: true,
      payment: true,
      items: {
        include: {
          course: { include: { modules: { include: { contents: true } } } },
          bundle: {
            include: {
              items: {
                include: {
                  course: {
                    include: { modules: { include: { contents: true } } },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};

const getOrdersByUserId = async (userId: string) => {
  const result = await prismaClient.order.findMany({
    where: { userId },
    include: {
      user: true,
      payment: true,
      items: {
        include: {
          course: { include: { modules: { include: { contents: true } } } },
          bundle: {
            include: {
              items: {
                include: {
                  course: {
                    include: { modules: { include: { contents: true } } },
                  },
                },
              },
            },
          },
        },
      },
    },
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

  await prismaClient.orderItem.deleteMany({ where: { orderId: id } });

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
