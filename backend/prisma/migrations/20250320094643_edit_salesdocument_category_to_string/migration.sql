/*
  Warnings:

  - Added the required column `userId` to the `PartnerCompany` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `SalesDocument` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PartnerCompany" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesDocument" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;
