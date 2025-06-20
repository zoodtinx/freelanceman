import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { getTimezonedDate } from '@/shared/helper/timezoned-date';
import {
    CreateEventDto,
    EditEventDto,
    EventFilterDto,
} from 'freelanceman-common';

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
                    project: projectId
                        ? {
                              connect: {
                                  id: projectId,
                              },
                          }
                        : undefined,
                    client: clientId
                        ? {
                              connect: {
                                  id: clientId,
                              },
                          }
                        : undefined,
                },
            });

            console.log('result', result);

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

        console.log('filter.status', filter.status);

        try {
            const where = {
                userId,
                name: {
                    contains: filter.name,
                    mode: 'insensitive' as const,
                },
                dueAt:
                    filter.status === 'scheduled'
                        ? { gte: date }
                        : filter.status === 'completed'
                          ? { lte: date }
                          : filter.dueAt,
                projectId: filter.projectId,
                clientId: filter.clientId,
            };

            const [unfilteredTotal, total, items] = await Promise.all([
                this.prismaService.event.count({
                    where: { userId }, 
                }),
                this.prismaService.event.count({ where }),
                this.prismaService.event.findMany({
                    where,
                    take: filter.take ?? 25,
                    orderBy: {
                        dueAt: filter.status === 'scheduled' ? 'asc' : 'desc',
                    },
                    include: {
                        client: {
                            select: { id: true, name: true, themeColor: true },
                        },
                        project: {
                            select: { id: true, name: true },
                        },
                    },
                }),
            ]);

            return { items, total, unfilteredTotal };
        } catch (e) {
            console.log('e', e);
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
        const data = Object.fromEntries(
            Object.entries(editEventDto).filter(([, v]) => v !== undefined),
        );
        try {
            await this.prismaService.event.update({
                where: { id: eventId, userId },
                data,
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
