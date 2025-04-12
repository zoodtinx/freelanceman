/*
  Warnings:

  - You are about to drop the `_SalesDocumentToSalesDocumentItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parentDocumentId` to the `SalesDocumentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SalesDocumentToSalesDocumentItem" DROP CONSTRAINT "_SalesDocumentToSalesDocumentItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_SalesDocumentToSalesDocumentItem" DROP CONSTRAINT "_SalesDocumentToSalesDocumentItem_B_fkey";

-- AlterTable
ALTER TABLE "SalesDocumentItem" ADD COLUMN     "parentDocumentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SalesDocumentToSalesDocumentItem";

-- AddForeignKey
ALTER TABLE "SalesDocumentItem" ADD CONSTRAINT "SalesDocumentItem_parentDocumentId_fkey" FOREIGN KEY ("parentDocumentId") REFERENCES "SalesDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
