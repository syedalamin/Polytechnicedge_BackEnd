-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user_progress" ADD COLUMN     "currentContentId" TEXT;
