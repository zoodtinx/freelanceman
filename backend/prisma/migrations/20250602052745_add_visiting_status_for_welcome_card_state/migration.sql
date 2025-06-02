-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isFirstTimeVisitor" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "VisitingStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "homePage" BOOLEAN NOT NULL DEFAULT false,
    "actionsPage" BOOLEAN NOT NULL DEFAULT false,
    "allClientsPage" BOOLEAN NOT NULL DEFAULT false,
    "partnersPage" BOOLEAN NOT NULL DEFAULT false,
    "incomePage" BOOLEAN NOT NULL DEFAULT false,
    "filesPage" BOOLEAN NOT NULL DEFAULT false,
    "projectPage" BOOLEAN NOT NULL DEFAULT false,
    "documentBuilderPage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VisitingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitingStatus_userId_key" ON "VisitingStatus"("userId");

-- AddForeignKey
ALTER TABLE "VisitingStatus" ADD CONSTRAINT "VisitingStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
