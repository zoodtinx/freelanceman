import { deleteS3Directory } from '@/shared/s3/helpers/delete-s3-dir';
import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class DemoCleanupService {
    private readonly logger = new Logger(DemoCleanupService.name);

    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {}

    @Cron(CronExpression.EVERY_HOUR)
    async handleDemoUserCleanup() {
        try {
            const expiryDate = new Date(Date.now() - 2 * 60 * 60 * 1000);

            const s3Config = {
                accessKeyId: this.configService.get('aws.accessKeyId')!,
                secretAccessKey: this.configService.get('aws.secretAccessKey')!,
                region: this.configService.get('aws.region')!,
                bucket: this.configService.get('aws.bucket')!,
            };

            const staleProjects = await this.prisma.user.findMany({
                where: {
                    isDemo: true,
                    createdAt: { lt: expiryDate },
                },
            });

            const staleProjectsIds = staleProjects.map((project) => project.id);

            await Promise.all(
                staleProjectsIds.map((id) =>
                    deleteS3Directory({
                        prefix: id,
                        ...s3Config,
                    }),
                ),
            );
            const result = await this.prisma.user.deleteMany({
                where: {
                    id: {
                        in: staleProjectsIds,
                    },
                },
            });

            this.logger.log(`Deleted ${result.count} expired demo users`);
        } catch (error) {
            this.logger.error('Error during demo user cleanup:', error);
            throw new InternalServerErrorException(
                'Failed to clean up demo users.',
            );
        }
    }
}
