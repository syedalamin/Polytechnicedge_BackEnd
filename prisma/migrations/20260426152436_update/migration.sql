-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailOtp" TEXT,
ADD COLUMN     "emailOtpExpires" TIMESTAMP(3),
ADD COLUMN     "otpAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "otpLastSentAt" TIMESTAMP(3),
ADD COLUMN     "twoFactorSecret" TEXT;
