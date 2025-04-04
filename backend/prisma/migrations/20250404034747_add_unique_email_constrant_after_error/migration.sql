-- DropIndex
DROP INDEX "SalesDocument_freelanceremail_key";

-- AlterTable
ALTER TABLE "SalesDocument" ALTER COLUMN "freelanceremail" DROP DEFAULT;
