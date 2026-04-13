import { bundleItemService } from "./bundleItem.service";

export const bundleItemResolvers = {
  Query: {
    getBundleItemsByBundleId: async (_: any, { bundleId }: { bundleId: string }) => {
      return await bundleItemService.getBundleItemsByBundleId(bundleId);
    },
    getBundleItemById: async (_: any, { id }: { id: string }) => {
      return await bundleItemService.getBundleItemById(id);
    },
  },
  Mutation: {
    createBundleItem: async (_: any, { bundleId, data }: { bundleId: string; data: any }) => {
      return await bundleItemService.createBundleItem(bundleId, data);
    },
    updateBundleItem: async (_: any, { id, priceAtBundleTime }: { id: string; priceAtBundleTime: number }) => {
      return await bundleItemService.updateBundleItem(id, priceAtBundleTime);
    },
    deleteBundleItem: async (_: any, { id }: { id: string }) => {
      return await bundleItemService.deleteBundleItem(id);
    },
  },
};