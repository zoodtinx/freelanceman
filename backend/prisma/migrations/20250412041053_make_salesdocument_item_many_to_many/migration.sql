/*
  Warnings:

  - You are about to drop the column `salesDocumentId` on the `SalesDocumentItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SalesDocumentItem" DROP CONSTRAINT "SalesDocumentItem_salesDocumentId_fkey";

-- AlterTable
ALTER TABLE "SalesDocumentItem" DROP COLUMN "salesDocumentId";

-- CreateTable
CREATE TABLE "_SalesDocumentToSalesDocumentItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SalesDocumentToSalesDocumentItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SalesDocumentToSalesDocumentItem_B_index" ON "_SalesDocumentToSalesDocumentItem"("B");

-- AddForeignKey
ALTER TABLE "_SalesDocumentToSalesDocumentItem" ADD CONSTRAINT "_SalesDocumentToSalesDocumentItem_A_fkey" FOREIGN KEY ("A") REFERENCES "SalesDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesDocumentToSalesDocumentItem" ADD CONSTRAINT "_SalesDocumentToSalesDocumentItem_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesDocumentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
