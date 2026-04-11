import { paymentService } from "./payment.service";
import { IPaginationOptions } from "./payment.interface";

export const paymentResolvers = {
  Query: {
    allPayments: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await paymentService.getAllPayments(filter, paginationOptions);
    },
    payment: async (_: any, { id }: { id: string }) => {
      return await paymentService.getPaymentById(id);
    },
    paymentByOrderId: async (_: any, { orderId }: { orderId: string }) => {
      return await paymentService.getPaymentByOrderId(orderId);
    },
  },
};