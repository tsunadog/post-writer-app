/*
  Warnings:

  - The `stripe_current_period_end` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `verification_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `verification_tokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_stripe_current_period_end_key";

-- DropIndex
DROP INDEX "users_stripe_price_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stripe_current_period_end",
ADD COLUMN     "stripe_current_period_end" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_pkey",
DROP COLUMN "id";
