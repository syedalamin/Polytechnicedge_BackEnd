/*
  Warnings:

  - You are about to drop the column `order` on the `contents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "order",
ADD COLUMN     "serial" INTEGER NOT NULL DEFAULT 0;
