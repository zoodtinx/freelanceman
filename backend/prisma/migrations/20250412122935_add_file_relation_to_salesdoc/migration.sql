/*
  Warnings:

  - A unique constraint covering the columns `[generatedFileId]` on the table `SalesDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SalesDocument" ADD COLUMN     "generatedFileId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SalesDocument_generatedFileId_key" ON "SalesDocument"("generatedFileId");

-- AddForeignKey
ALTER TABLE "SalesDocument" ADD CONSTRAINT "SalesDocument_generatedFileId_fkey" FOREIGN KEY ("generatedFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
