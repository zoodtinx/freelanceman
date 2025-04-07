/*
  Warnings:

  - Added the required column `userId` to the `SalesDocumentItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesDocumentItem" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SalesDocumentItem" ADD CONSTRAINT "SalesDocumentItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
