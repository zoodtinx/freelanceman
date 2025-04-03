import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class DemoCleanupService {
    private readonly logger = new Logger(DemoCleanupService.name);
    constructor(private prismaService: PrismaService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleDemoUserCleanup() {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() - 1);

        const result = await this.prismaService.user.deleteMany({
            where: {
                isDemo: true,
                createdAt: { lt: expiryDate },
            },
        });

        this.logger.log(`Deleted ${result.count} expired demo users`);
    }
}
