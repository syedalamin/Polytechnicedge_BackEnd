import { paymentService } from "./payment.service";
import { IPaginationOptions } from "./payment.interface";
import { UserRole } from "../../../generated/prisma/enums";
import graphqlAuth from "../../middlewares/graphqlAuth";

export const paymentResolvers = {
  Query: {
    allPayments: async (_: any, args: any, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await paymentService.getAllPayments(filter, paginationOptions);
    },
    payment: async (_: any, { id }: { id: string }, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STUDENT);
      return await paymentService.getPaymentById(id);
    },
    getPaymentByOrderId: async (_: any, { orderId }: { orderId: string }, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STUDENT);
      return await paymentService.getPaymentByOrderId(orderId);
    },
 
    getPaymentByUserId: async (_: any, { userId }: { userId: string }, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STUDENT);
      return await paymentService.getPaymentByUserId(userId);
    },
  },
};
