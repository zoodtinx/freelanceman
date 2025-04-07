-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "email" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ClientContact" ALTER COLUMN "email" DROP DEFAULT;

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "s3Key" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PartnerCompany" ALTER COLUMN "email" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PartnerContact" ALTER COLUMN "email" DROP DEFAULT;
