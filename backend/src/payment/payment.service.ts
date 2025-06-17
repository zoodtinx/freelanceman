import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ProjectFilterDto } from 'freelanceman-common';

@Injectable()
export class PaymentService {
    constructor(
        private prismaService: PrismaService,
        private projectService: ProjectsService,
    ) {}

    async getPaymentData(userId: string, filter: ProjectFilterDto) {
    try {
        const where = {
            userId,
            clientId: filter.clientId,
            name: filter.name
                    ? { contains: filter.name, mode: 'insensitive' as const }
                    : undefined,
            paymentStatus: filter.paymentStatus
                ? filter.paymentStatus === 'paid'
                    ? 'paid'
                    : { not: 'paid' }
                : undefined,
        };

        console.log('where', where)

        const [total, items] = await Promise.all([
            this.prismaService.project.count({ where }),
            this.prismaService.project.findMany({
            where,
            include: {
                salesDocuments: true,
                client: true,
            },
            orderBy: [
                { paymentStatus: 'asc' },
                { name: 'asc' },
            ],
            take: filter.take ? filter.take : 13,
            }),
        ]);

        return {total, items};
    } catch {
        throw new InternalServerErrorException('Failed to fetch payment data');
    }
}

    async getPaymentStats(userId: string) {
        try {
            const projects = await this.prismaService.project.findMany({
                where: { userId },
                select: {
                    paymentStatus: true,
                    budget: true,
                },
            });

            let processing = 0;
            let unprocessed = 0;
            let allAmountDue = 0;

            for (const project of projects) {
                if (project.paymentStatus !== 'paid') {
                    allAmountDue += project.budget;

                    if (project.paymentStatus === 'pending') {
                        unprocessed += project.budget;
                    } else if (project.paymentStatus === 'processing') {
                        processing += project.budget;
                    }
                }
            }

            const result = {
                unprocessed,
                processing,
                allAmountDue,
            };

            return result;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to fetch payment data',
            );
        }
    }
}
