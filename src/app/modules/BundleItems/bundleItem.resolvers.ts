import { bundleItemService } from "./bundleItem.service";
import { calculatePagination } from "../../../utils/pagination";

export const bundleItemResolvers = {
  Query: {
    getBundleItemsByBundleId: async (_: any, { filter, pagination }: any) => {
      const { page, limit } = calculatePagination(pagination);
      return await bundleItemService.getBundleItemsByBundleId(filter?.bundleId, { page, limit });
    },
    getBundleItemById: async (_: any, { id }: { id: string }) => {
      return await bundleItemService.getBundleItemById(id);
    },
  },
  
};