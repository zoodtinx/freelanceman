-- DropForeignKey
ALTER TABLE "SalesDocument" DROP CONSTRAINT "SalesDocument_clientId_fkey";

-- AlterTable
ALTER TABLE "SalesDocument" ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "clientName" DROP NOT NULL;
