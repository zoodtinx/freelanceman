-- CreateTable
CREATE TABLE "ClientContactOnProject" (
    "projectId" TEXT NOT NULL,
    "clientContactId" TEXT NOT NULL,

    CONSTRAINT "ClientContactOnProject_pkey" PRIMARY KEY ("projectId","clientContactId")
);

-- CreateTable
CREATE TABLE "PartnerContactOnProject" (
    "projectId" TEXT NOT NULL,
    "partnerContactId" TEXT NOT NULL,

    CONSTRAINT "PartnerContactOnProject_pkey" PRIMARY KEY ("projectId","partnerContactId")
);

-- AddForeignKey
ALTER TABLE "ClientContactOnProject" ADD CONSTRAINT "ClientContactOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientContactOnProject" ADD CONSTRAINT "ClientContactOnProject_clientContactId_fkey" FOREIGN KEY ("clientContactId") REFERENCES "ClientContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerContactOnProject" ADD CONSTRAINT "PartnerContactOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerContactOnProject" ADD CONSTRAINT "PartnerContactOnProject_partnerContactId_fkey" FOREIGN KEY ("partnerContactId") REFERENCES "PartnerContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
