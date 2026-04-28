/*
  Warnings:

  - You are about to drop the column `token` on the `payments` table. All the data in the column will be lost.
  - The `paymentGateway` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "token",
DROP COLUMN "paymentGateway",
ADD COLUMN     "paymentGateway" JSONB;
