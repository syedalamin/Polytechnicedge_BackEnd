import prismaClient from "../../../config/prismaClient";
import { orderService } from "./order.service";
import { IPaginationOptions } from "./order.interface";

export const orderResolvers = {
  Order: {
    user: async (parent: any) => {
      if (parent.user) return parent.user;
      return await prismaClient.user.findUnique({
        where: { id: parent.userId },
      });
    },
    items: async (parent: any) => {
      if (parent.items) return parent.items;
      return await prismaClient.orderItem.findMany({
        where: { orderId: parent.id },
        include: { course: true },
      });
    },
    payment: async (parent: any) => {
      if (parent.payment) return parent.payment;
      return await prismaClient.payment.findUnique({
        where: { orderId: parent.id },
      });
    },
  },
  OrderItem: {
    order: async (parent: any) => {
      if (parent.order) return parent.order;
      return await prismaClient.order.findUnique({
        where: { id: parent.orderId },
      });
    },
    course: async (parent: any) => {
      if (parent.course) return parent.course;
      return await prismaClient.course.findUnique({
        where: { id: parent.courseId },
      });
    },
  },
  Query: {
    allOrders: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await orderService.getAllOrders(filter, paginationOptions);
    },
    order: async (_: any, { id }: { id: string }) => {
      return await orderService.getOrderById(id);
    },
    ordersByUserId: async (_: any, { userId }: { userId: string }) => {
      return await orderService.getOrdersByUserId(userId);
    },
  },
};