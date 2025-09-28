-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "resetExpiresAt" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;
