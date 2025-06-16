/*
  Warnings:

  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `currency` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "specialization" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "currency" SET NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'THB';
