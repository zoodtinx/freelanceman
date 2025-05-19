import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    CreateEventDto,
    EditEventDto,
    EventFilterDto,
} from 'freelanceman-common';
import { Prisma } from '@prisma/client';
import { getTimezonedDate } from '@/shared/helper/timezoned-date';

@Injectable()
export class EventsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createEventDto: CreateEventDto) {
        const { projectId, ...eventData } = createEventDto;
        try {
            let clientId: any;

            if (projectId) {
                const project = await this.prismaService.project.findUnique({
                    where: { id: projectId },
                    select: { clientId: true },
                });

                if (!project) throw new Error('Project not found');

                clientId = project.clientId;
            }

            const result = await this.prismaService.event.create({
                data: {
                    ...eventData,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    client: clientId
                        ? {
                              connect: {
                                  id: clientId,
                              },
                          }
                        : undefined,
                },
            });

            console.log('result', result)

            return result;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException(
                    'An event with this unique field already exists',
                );
            }

            throw new InternalServerErrorException('Failed to create event');
        }
    }

    async findAll(userId: string, filter: EventFilterDto) {
        const date = getTimezonedDate();

        try {
            const where = {
                userId,
                name: {
                    contains: filter.name,
                    mode: 'insensitive' as const,
                },
                status:
                    filter.status === 'cancelled'
                        ? filter.status
                        : { not: 'cancelled' },
                dueAt:
                    filter.status === 'scheduled'
                        ? { gte: date }
                        : filter.status === 'completed'
                          ? { lte: date }
                          : filter.dueAt,
                projectId: filter.projectId,
                clientId: filter.clientId,
            };

            const [total, items] = await Promise.all([
                this.prismaService.event.count({ where }),
                this.prismaService.event.findMany({
                    where,
                    take: filter.take ? filter.take : 20,
                    orderBy: {
                        dueAt: filter.status === 'scheduled' ? 'asc' : 'desc',
                    },
                    include: {
                        client: {
                            select: { id: true, name: true, themeColor: true },
                        },
                        project: {
                            select: { id: true, title: true },
                        },
                    },
                }),
            ]);

            return { items, total };
        } catch {
            throw new InternalServerErrorException('Failed to find events');
        }
    }

    async findOne(userId: string, eventId: string) {
        try {
            const event = await this.prismaService.event.findUnique({
                where: { id: eventId, userId },
            });
            if (!event) {
                throw new NotFoundException(
                    `Event with ID ${eventId} not found`,
                );
            }
            return event;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to find event');
        }
    }

    async update(userId: string, eventId: string, editEventDto: EditEventDto) {
        try {
            await this.prismaService.event.update({
                where: { id: eventId, userId },
                data: editEventDto,
            });
            return await this.findOne(userId, eventId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update event');
        }
    }

    async remove(userId: string, eventId: string) {
        try {
            await this.prismaService.event.delete({
                where: { id: eventId, userId },
            });
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException('Failed to remove event');
        }
    }
}
