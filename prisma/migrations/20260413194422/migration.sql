/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "invoiceId" TEXT,
ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_invoiceId_key" ON "payments"("invoiceId");
