/*
  Warnings:

  - You are about to drop the `_PartnerCompanyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PartnerCompanyToUser" DROP CONSTRAINT "_PartnerCompanyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PartnerCompanyToUser" DROP CONSTRAINT "_PartnerCompanyToUser_B_fkey";

-- DropTable
DROP TABLE "_PartnerCompanyToUser";

-- AddForeignKey
ALTER TABLE "PartnerCompany" ADD CONSTRAINT "PartnerCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
