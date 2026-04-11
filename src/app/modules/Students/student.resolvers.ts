import prismaClient from "../../../config/prismaClient";
import { UserRole } from "../../../generated/prisma/enums";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { PaginationArgs } from "../Admins/admin.resolvers";
import { IPaginationOptions } from "./student.interface";
import { studentsService } from "./student.service";

export const studentResolvers = {
  Student: {
    sessionBookings: async (parent: any) => {
      if (parent.sessionBookings) return parent.sessionBookings;
      return await prismaClient.sessionBooking.findMany({
        where: { userId: parent.userId },
        include: { session: true },
      });
    },
  },
  Session: {
    instructor: async (parent: any) => {
      if (parent.instructor) return parent.instructor;
      return await prismaClient.instructorProfile.findUnique({
        where: { id: parent.instructorId },
      });
    },
    bookings: async (parent: any) => {
      if (parent.bookings) return parent.bookings;
      return await prismaClient.sessionBooking.findMany({
        where: { sessionId: parent.id },
        include: { user: true },
      });
    },
  },
  SessionBooking: {
    session: async (parent: any) => {
      if (parent.session) return parent.session;
      return await prismaClient.session.findUnique({
        where: { id: parent.sessionId },
      });
    },
    user: async (parent: any) => {
      if (parent.user) return parent.user;
      return await prismaClient.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
  Query: {
    studentProfile: async (_: any, { id }: { id: string }, context: any) => {
      await graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await studentsService.getStudentProfile(id);
    },
    getAllStudents: async (_: any, args: PaginationArgs, context: any) => {
      await graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await studentsService.getAllStudents(paginationOptions);
    },
  },
};