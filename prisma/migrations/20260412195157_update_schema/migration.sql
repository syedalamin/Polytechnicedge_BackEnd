/*
  Warnings:

  - You are about to drop the column `price` on the `course_bundle_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bundleId,courseId]` on the table `course_bundle_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,courseId]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceAtBundleTime` to the `course_bundle_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_courseId_fkey";

-- AlterTable
ALTER TABLE "course_bundle_items" DROP COLUMN "price",
ADD COLUMN     "priceAtBundleTime" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "orderItemId" TEXT,
ALTER COLUMN "enrolledAt" DROP NOT NULL,
ALTER COLUMN "enrolledAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "bundleId" TEXT,
ALTER COLUMN "courseId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_bundle_items_bundleId_courseId_key" ON "course_bundle_items"("bundleId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_userId_courseId_key" ON "enrollments"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "course_bundles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
