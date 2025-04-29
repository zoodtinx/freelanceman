-- DropForeignKey
ALTER TABLE "SalesDocument" DROP CONSTRAINT "SalesDocument_generatedFileId_fkey";

-- DropIndex
DROP INDEX "Client_email_key";

-- DropIndex
DROP INDEX "Client_taxId_key";

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "taxId" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "detail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SalesDocument" ADD COLUMN     "fileKey" TEXT;
