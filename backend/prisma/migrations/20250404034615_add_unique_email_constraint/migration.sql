/*
  Warnings:

  - You are about to drop the column `freelancerEmail` on the `SalesDocument` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `ClientContact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `PartnerCompany` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `PartnerContact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[freelanceremail]` on the table `SalesDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "email" SET DEFAULT 'a@a.com';

-- AlterTable
ALTER TABLE "ClientContact" ALTER COLUMN "email" SET DEFAULT 'a@a.com';

-- AlterTable
ALTER TABLE "PartnerCompany" ALTER COLUMN "email" SET DEFAULT 'a@a.com';

-- AlterTable
ALTER TABLE "PartnerContact" ALTER COLUMN "email" SET DEFAULT 'a@a.com';

-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "freelancerEmail",
ADD COLUMN     "freelanceremail" TEXT NOT NULL DEFAULT 'a@a.com';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DEFAULT 'a@a.com';

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientContact_email_key" ON "ClientContact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerCompany_email_key" ON "PartnerCompany"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerContact_email_key" ON "PartnerContact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SalesDocument_freelanceremail_key" ON "SalesDocument"("freelanceremail");
