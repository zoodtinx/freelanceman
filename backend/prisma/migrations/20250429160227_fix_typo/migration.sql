/*
  Warnings:

  - You are about to drop the column `freelancerDetail` on the `SalesDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "freelancerDetail",
ADD COLUMN     "freelancerAddress" TEXT;
