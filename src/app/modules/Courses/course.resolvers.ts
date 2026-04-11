import prismaClient from "../../../config/prismaClient";
import { courseService } from "./course.service";
import { IPaginationOptions } from "./course.interface";
import { UserRole } from "../../../Shared/enums";
import graphqlAuth from "../../middlewares/graphqlAuth";

export const courseResolvers = {
  Course: {
    author: async (parent: any) => {
      if (parent.author) return parent.author;
      if (parent.authorId) {
        return await prismaClient.user.findUnique({
          where: { id: parent.authorId },
        });
      }
      return null;
    },
    modules: async (parent: any) => {
      if (parent.modules) return parent.modules;
      return await prismaClient.module.findMany({
        where: { courseId: parent.id },
        orderBy: { weekNumber: "asc" },
      });
    },
    enrollments: async (parent: any) => {
      if (parent.enrollments) return parent.enrollments;
      return await prismaClient.enrollment.findMany({
        where: { courseId: parent.id },
      });
    },
    orderItems: async (parent: any) => {
      if (parent.orderItems) return parent.orderItems;
      return await prismaClient.orderItem.findMany({
        where: { courseId: parent.id },
      });
    },
    userProgress: async (parent: any) => {
      if (parent.userProgress) return parent.userProgress;
      return await prismaClient.userProgress.findMany({
        where: { courseId: parent.id },
      });
    },
    certificates: async (parent: any) => {
      if (parent.certificates) return parent.certificates;
      return await prismaClient.certificate.findMany({
        where: { courseId: parent.id },
      });
    },
    notices: async (parent: any) => {
      if (parent.notices) return parent.notices;
      return await prismaClient.notice.findMany({
        where: { courseId: parent.id },
      });
    },
    instructors: async (parent: any) => {
      if (parent.instructors) return parent.instructors;
      return await prismaClient.courseInstructor.findMany({
        where: { courseId: parent.id },
        include: { instructor: true },
      });
    },
    bundleItems: async (parent: any) => {
      if (parent.bundleItems) return parent.bundleItems;
      return await prismaClient.courseBundleItem.findMany({
        where: { courseId: parent.id },
      });
    },
  },
  Query: {
    allCourses: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await courseService.getAllCourses(filter, paginationOptions);
    },
    course: async (_: any, { slug }: { slug: string }) => {
      return await courseService.getCourseBySlug(slug);
    },
    featuredCourses: async () => {
      return await courseService.getFeaturedCourses();
    },
  },
};