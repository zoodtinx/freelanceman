-- DropIndex
DROP INDEX "SalesDocument_number_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP DEFAULT;
