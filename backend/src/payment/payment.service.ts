import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class PaymentService {
    constructor(
        private prismaService: PrismaService,
        private projectService: ProjectsService,
    ) {}

    async getPaymentData(userId: string, clientId: string) {
        try {
            const result = await this.prismaService.project.findMany({
                where: {
                    userId,
                    clientId,
                    paymentStatus: {
                        not: 'paid',
                    },
                },
                include: {
                    client: true
                },
                orderBy: {
                    paymentStatus: 'desc',
                },
                take: 15
            });
            return result;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to fetch payment data',
            );
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

                    if (project.paymentStatus === 'unpaid') {
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
