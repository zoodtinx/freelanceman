/*
  Warnings:

  - You are about to drop the column `generatedFileId` on the `SalesDocument` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SalesDocument_generatedFileId_key";

-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "generatedFileId",
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'THB';
