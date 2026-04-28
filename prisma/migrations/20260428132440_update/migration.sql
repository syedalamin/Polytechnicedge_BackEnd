/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `payments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "payments_invoiceId_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "invoiceId",
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentGateway" JSONB[];
