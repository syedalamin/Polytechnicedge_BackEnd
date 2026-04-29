import { z } from "zod";

const createNoticeValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).max(200),
    content: z.string().min(1, { message: "Content is required" }),
    isGlobal: z.boolean().optional(),
    courseId: z.string().optional(),
  }),
});

const updateNoticeValidation = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    content: z.string().min(1).optional(),
    isGlobal: z.boolean().optional(),
    courseId: z.string().optional(),
  }),
});

export const noticeValidation = {
  createNoticeValidation,
  updateNoticeValidation,
};