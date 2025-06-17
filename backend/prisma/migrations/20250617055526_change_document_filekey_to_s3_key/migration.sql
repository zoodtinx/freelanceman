/*
  Warnings:

  - You are about to drop the column `fileKey` on the `SalesDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "fileKey",
ADD COLUMN     "s3Key" TEXT;
