/*
  Warnings:

  - You are about to drop the column `token` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RefreshToken_token_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "_PartnerCompanyToUser" ADD CONSTRAINT "_PartnerCompanyToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PartnerCompanyToUser_AB_unique";
