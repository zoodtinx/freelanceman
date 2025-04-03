import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DemoCleanupService } from './demo-cleanup.service';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [DemoCleanupService, PrismaService],
})
export class CronJobsModule {}
