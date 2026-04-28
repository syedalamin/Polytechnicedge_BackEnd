/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[valId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "bankTranId" TEXT,
ADD COLUMN     "refundAmount" DECIMAL(10,2),
ADD COLUMN     "refundId" TEXT,
ADD COLUMN     "refundStatus" TEXT,
ADD COLUMN     "valId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "orders_transactionId_key" ON "orders"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_valId_key" ON "payments"("valId");
