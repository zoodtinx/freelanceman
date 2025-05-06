-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isWithTime" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isWithTime" BOOLEAN DEFAULT false;
