import prismaClient from "../../../config/prismaClient";
import {
  ICreatePayment,
  IPaymentFilter,
  IPaginationOptions,
  IPaginatedPayments,
} from "./payment.interface";
import { calculatePagination } from "../../../utils/pagination";

import SSLCommerzPayment from "sslcommerz-lts";
import {
  PaymentStatus,
  OrderStatus,
  EnrollmentStatus,
} from "../../../generated/prisma/enums";
import { Request } from "express";
import { ApiError } from "../../../errors/apiError";
import status from "http-status";
import { appConfig } from "../../../config/appConfig";

const getSSLCommerzInstance = () => {
  const isLive = appConfig.ssl.isLive;
  return new SSLCommerzPayment(
    appConfig.ssl.storeId as string,
    appConfig.ssl.storePassword as string,
    isLive,
  );
};

const processEnrollment = async (userId: string, orderId: string) => {
  const order = await prismaClient.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) throw new ApiError(status.NOT_FOUND, "Order not found....");

  for (const item of order.items) {
    if (item.courseId) {
      await prismaClient.enrollment.create({
        data: {
          userId,
          courseId: item.courseId,
          orderItemId: item.id,
          status: EnrollmentStatus.ACTIVE,
          enrolledAt: new Date(),
        },
      });
      await prismaClient.userProgress.create({
        data: {
          userId,
          courseId: item.courseId,
          progress: 0,
          isCompleted: false,
          lastAccessed: new Date(),
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
              userId,
              courseId: bundleItem.courseId,
              orderItemId: item.id,
              status: EnrollmentStatus.ACTIVE,
              enrolledAt: new Date(),
            },
          });
          await prismaClient.userProgress.create({
            data: {
              userId,
              courseId: bundleItem.courseId,
              progress: 0,
              isCompleted: false,
              lastAccessed: new Date(),
            },
          });
        }
      }
    }
  }
};
// const createPayment = async (req: Request) => {
//   const { userId } = req.user as {
//     userId: string;
//     username: string;
//     email: string;
//     role: string;
//   };
//   const data = req.body as ICreatePayment;
//   const [user, order] = await Promise.all([
//     prismaClient.user.findUnique({ where: { id: userId } }),
//     prismaClient.order.findUnique({
//       where: { id: data.orderId },
//       include: { items: true },
//     }),
//   ]);

//   if (!user) throw new Error("User not found");
//   if (!order) throw new Error("Order not found");

//   const existingPayment = await prismaClient.payment.findUnique({
//     where: { orderId: data.orderId },
//   });
//   if (existingPayment) throw new Error("Payment already exists for this order");

//   const payment = await prismaClient.payment.create({
//     data: {
//       userId: user.id,
//       orderId: order.id,
//       amount: order.totalAmount,
//       transactionId: data.transactionId,
//       paymentMethod: data.paymentMethod,
//       status: PaymentStatus.COMPLETED,
//       paidAt: new Date(),
//     },
//   });

//   await prismaClient.order.update({
//     where: { id: order.id },
//     data: {
//       status: OrderStatus.PAID,
//       transactionId: data.transactionId,
//     },
//   });

//   for (const item of order.items) {
//     if (item.courseId) {
//       await prismaClient.enrollment.create({
//         data: {
//           userId: user.id,
//           courseId: item.courseId,
//           orderItemId: item.id,
//           status: EnrollmentStatus.ACTIVE,
//           enrolledAt: new Date(),
//         },
//       });
//       await prismaClient.userProgress.create({
//         data: {
//           userId: user.id,
//           courseId: item.courseId,
//           progress: 0,
//           isCompleted: false,
//           lastAccessed: new Date(),
//         },
//       });
//     } else if (item.bundleId) {
//       const bundle = await prismaClient.courseBundle.findUnique({
//         where: { id: item.bundleId },
//         include: { items: true },
//       });
//       if (bundle) {
//         for (const bundleItem of bundle.items) {
//           await prismaClient.enrollment.create({
//             data: {
//               userId: user.id,
//               courseId: bundleItem.courseId,
//               orderItemId: item.id,
//               status: EnrollmentStatus.ACTIVE,
//               enrolledAt: new Date(),
//             },
//           });
//           await prismaClient.userProgress.create({
//             data: {
//               userId: user.id,
//               courseId: bundleItem.courseId,
//               progress: 0,
//               isCompleted: false,
//               lastAccessed: new Date(),
//             },
//           });
//         }
//       }
//     }
//   }

//   return payment;
// };

const createPayment = async (req: Request) => {
  const { userId, username, email } = req.user as {
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

  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  if (!order) throw new ApiError(status.NOT_FOUND, "Order not found");

  const existingPayment = await prismaClient.payment.findUnique({
    where: { orderId: data.orderId },
  });

  if (existingPayment) {
    throw new ApiError(
      status.BAD_REQUEST,
      "Payment already exists for this order",
    );
  }

  const transactionId = `TXN_${Date.now()}`;

  const payment = await prismaClient.payment.create({
    data: {
      userId: user.id,
      orderId: order.id,
      amount: order.totalAmount,
      transactionId,
      paymentGateway: { provider: "SSLCommerz" },
      status: PaymentStatus.PENDING,
    },
  });

  const sslData = {
    total_amount: order.totalAmount.toString(),
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${appConfig.ssl.backendUrl}/api/v1/payments/success`,
    fail_url: `${appConfig.ssl.backendUrl}/api/v1/payments/fail`,
    cancel_url: `${appConfig.ssl.backendUrl}/api/v1/payments/cancel`,
    ipn_url: `${appConfig.ssl.backendUrl}/api/v1/payments/ipn`,
    cus_name: username,
    cus_email: email,
    shipping_method: "NO",
    product_name: "Course",
    product_category: "Education",
    product_profile: "general",
  };

  const sslcz = getSSLCommerzInstance();
  const response = await sslcz.init(sslData);

  await prismaClient.payment.update({
    where: { id: payment.id },
    data: { sessionkey: response.sessionkey },
  });

  return {
    status: response.status,
    GatewayPageURL: response.GatewayPageURL,
    sessionkey: response.sessionkey,
  };
};

const handlePaymentSuccess = async (tran_id: string, val_id: string) => {
  const sslcz = getSSLCommerzInstance();

  let validation;

  try {
    validation = await sslcz.validate({ val_id });
  } catch (err) {
    throw new ApiError(500, "Payment validation failed from SSLCommerz");
  }
  if (!validation || validation.status !== "VALID") {
    const payment = await prismaClient.payment.update({
      where: { transactionId: tran_id },
      data: {
        status: PaymentStatus.FAILED,
      },
    });

    await prismaClient.order.update({
      where: { id: payment.orderId },
      data: {
        status: OrderStatus.FAILED,
      },
    });
    return validation;
  }

  const payment = await prismaClient.payment.findUnique({
    where: { transactionId: tran_id },
  });

  if (!payment) {
    throw new ApiError(status.NOT_FOUND, "Payment not found");
  }

  if (payment.status !== PaymentStatus.COMPLETED) {
    await prismaClient.payment.update({
      where: { transactionId: tran_id },
      data: {
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
        valId: val_id,
        bankTranId: validation.bank_tran_id || null,
        paymentGateway: validation as any,
      },
    });

    await prismaClient.order.update({
      where: { id: payment.orderId },
      data: {
        status: OrderStatus.PAID,
        transactionId: tran_id,
      },
    });

    await processEnrollment(payment.userId, payment.orderId);
  }

  return validation;
};
const sslSuccess = async (req: Request) => {
  const { val_id, tran_id } = req.body || req.query;
  await handlePaymentSuccess(tran_id, val_id);

  return {
    redirectUrl: `${appConfig.frontendUrl}/success`,
  };
};

const sslFail = async (req: Request) => {
  const { tran_id } = req.body || req.query;

  if (tran_id) {
    const failedPayment = await prismaClient.payment.findUnique({
      where: { transactionId: tran_id },
    });
    await prismaClient.payment.update({
      where: { transactionId: tran_id },
      data: {
        status: PaymentStatus.FAILED,
      },
    });
    if (failedPayment) {
      await prismaClient.order.update({
        where: { id: failedPayment.orderId },
        data: {
          status: OrderStatus.FAILED,
        },
      });
    }
  }

  return {
    redirectUrl: `${appConfig.frontendUrl}/fail`,
  };
};

const sslCancel = async (req: Request) => {
  const { tran_id } = req.body || req.query;

  if (tran_id) {
    const cancelledPayment = await prismaClient.payment.findUnique({
      where: { transactionId: tran_id },
    });
    await prismaClient.payment.update({
      where: { transactionId: tran_id },
      data: {
        status: PaymentStatus.FAILED,
      },
    });

    if (cancelledPayment) {
      await prismaClient.order.update({
        where: { id: cancelledPayment.orderId },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });
    }
  }

  return {
    redirectUrl: `${process.env.FRONTEND_URL}/cancel`,
  };
};

const sslIPN = async (req: Request) => {
  const { val_id, tran_id } = req.body || req.query;
  console.log("SSL IPN Callback Received:", { val_id, tran_id });
  await handlePaymentSuccess(tran_id, val_id);
  return true;
};

// Initiate refund
const initiateRefund = async (data: {
  refund_amount: number;
  refund_remarks: string;
  bank_tran_id: string;
  refe_id: string;
}) => {
  const sslcz = getSSLCommerzInstance();
  return await sslcz.initiateRefund(data);
};

// Query refund status
const queryRefund = async (data: { refund_ref_id: string }) => {
  const sslcz = getSSLCommerzInstance();
  return await sslcz.refundQuery(data);
};

// Query transaction by transaction ID
const queryTransactionByTranId = async (data: { tran_id: string }) => {
  const sslcz = getSSLCommerzInstance();
  return await sslcz.transactionQueryByTransactionId(data);
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
    where: { userId },
    include: { user: true, order: { include: { items: true } } },
  });

  return result;
};

const deletePayment = async (id: string) => {
  const existing = await prismaClient.payment.findUnique({
    where: { id },
    include: { order: { include: { items: true } } },
  });
  if (!existing) throw new Error("Payment not found");

  const orderItems = existing.order.items;
  const courseIds = orderItems
    .filter((item) => item.courseId)
    .map((item) => item.courseId as string);

  if (orderItems.some((item) => item.bundleId)) {
    const bundleItems = await prismaClient.courseBundleItem.findMany({
      where: { bundleId: { in: orderItems.map((i) => i.bundleId as string) } },
    });
    courseIds.push(...bundleItems.map((b: { courseId: string }) => b.courseId));
  }

  await prismaClient.userProgress.deleteMany({
    where: {
      userId: existing.userId,
      courseId: { in: courseIds },
    },
  });

  await prismaClient.enrollment.deleteMany({
    where: {
      userId: existing.userId,
      courseId: { in: courseIds },
    },
  });

  await prismaClient.order.update({
    where: { id: existing.orderId },
    data: {
      status: "PENDING",
      transactionId: null,
    },
  });

  const result = await prismaClient.payment.delete({ where: { id } });

  return result;
};

export const paymentService = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  deletePayment,
  getPaymentByUserId,
  sslSuccess,
  sslFail,
  sslCancel,
  sslIPN,
  initiateRefund,
  queryRefund,
  queryTransactionByTranId,
};
