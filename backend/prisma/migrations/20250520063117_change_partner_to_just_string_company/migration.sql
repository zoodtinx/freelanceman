/*
  Warnings:

  - You are about to drop the column `companyId` on the `PartnerContact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PartnerContact" DROP CONSTRAINT "PartnerContact_companyId_fkey";

-- AlterTable
ALTER TABLE "PartnerContact" DROP COLUMN "companyId",
ADD COLUMN     "company" TEXT;
