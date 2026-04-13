import { z } from "zod";

const createBundleItemValidation = z.object({
  courseId: z.string().uuid(),
  priceAtBundleTime: z.number(),
});

const updateBundleItemValidation = z.object({
  priceAtBundleTime: z.number(),
});

export const bundleItemValidation = {
  createBundleItemValidation,
  updateBundleItemValidation,
};