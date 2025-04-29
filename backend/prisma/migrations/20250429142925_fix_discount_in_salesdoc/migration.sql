/*
  Warnings:

  - You are about to drop the column `customAdjustment` on the `SalesDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "customAdjustment",
ADD COLUMN     "discountFlat" DOUBLE PRECISION,
ADD COLUMN     "discountPercent" DOUBLE PRECISION;
