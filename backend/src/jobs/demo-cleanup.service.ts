import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class DemoCleanupService {
  private readonly logger = new Logger(DemoCleanupService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('*/15 * * * *')
  async handleDemoUserCleanup() {
    const expiryDate = new Date(Date.now() - 20 * 60 * 1000); // 20 minutes ago

    const result = await this.prisma.user.deleteMany({
      where: {
        isDemo: true,
        createdAt: { lt: expiryDate },
      },
    });

    this.logger.log(`Deleted ${result.count} expired demo users`);
  }
}
