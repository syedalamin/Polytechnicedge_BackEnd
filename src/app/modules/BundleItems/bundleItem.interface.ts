export interface ICourseBundleItem {
  id: string;
  bundleId: string;
  courseId: string;
  priceAtBundleTime: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBundleItem {
  courseId: string;
  priceAtBundleTime: number;
}

export interface IBundleItemFilter {
  bundleId?: string;
  courseId?: string;
}