 
import { orderService } from "./order.service";
import { IPaginationOptions } from "./order.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const orderResolvers = {
  Query: {
    allOrders: async (_: any, args: any, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await orderService.getAllOrders(filter, paginationOptions);
    },
    order: async (_: any, { id }: { id: string }, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN ,UserRole.STUDENT);
      return await orderService.getOrderById(id);
    },
    ordersByUserId: async (_: any, { userId }: { userId: string }, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STUDENT);
      return await orderService.getOrdersByUserId(userId);
    },
  },
};