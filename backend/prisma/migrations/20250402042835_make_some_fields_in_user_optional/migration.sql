/*
  Warnings:

  - You are about to drop the column `providerId` on the `AuthProvider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuthProvider" DROP COLUMN "providerId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
