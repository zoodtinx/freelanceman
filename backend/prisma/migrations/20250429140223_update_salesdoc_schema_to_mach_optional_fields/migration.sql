/*
  Warnings:

  - You are about to drop the column `selectedProjectClientId` on the `SalesDocument` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `SalesDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "selectedProjectClientId",
DROP COLUMN "subtotal",
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "referenceNumber" DROP NOT NULL,
ALTER COLUMN "projectDescription" DROP NOT NULL,
ALTER COLUMN "freelancerPhone" DROP NOT NULL,
ALTER COLUMN "freelancerTaxId" DROP NOT NULL,
ALTER COLUMN "clientTaxId" DROP NOT NULL,
ALTER COLUMN "tax" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "freelancerEmail" DROP NOT NULL;
