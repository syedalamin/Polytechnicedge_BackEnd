/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `admin_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `instructor_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `student_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `admin_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `instructor_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_profiles" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "instructor_profiles" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_username_key" ON "admin_profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_profiles_username_key" ON "instructor_profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_username_key" ON "student_profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");
