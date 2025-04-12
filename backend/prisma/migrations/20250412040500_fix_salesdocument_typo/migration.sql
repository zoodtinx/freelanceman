/*
  Warnings:

  - You are about to drop the column `freelanceremail` on the `SalesDocument` table. All the data in the column will be lost.
  - Added the required column `freelancerEmail` to the `SalesDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PartnerCompany" DROP CONSTRAINT "PartnerCompany_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "freelanceremail",
ADD COLUMN     "freelancerEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_PartnerCompanyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PartnerCompanyToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PartnerCompanyToUser_B_index" ON "_PartnerCompanyToUser"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerCompanyToUser" ADD CONSTRAINT "_PartnerCompanyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PartnerCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerCompanyToUser" ADD CONSTRAINT "_PartnerCompanyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
