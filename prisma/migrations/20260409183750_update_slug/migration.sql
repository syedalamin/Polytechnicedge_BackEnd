/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `admin_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `student_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `admin_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `student_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_profiles" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_slug_key" ON "admin_profiles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_slug_key" ON "student_profiles"("slug");
