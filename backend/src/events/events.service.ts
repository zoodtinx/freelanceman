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
import { DateTime } from 'luxon';


@Injectable()
export class EventsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createEventDto: CreateEventDto) {
        try {
            const project = await this.prismaService.project.findUnique({
                where: { id: createEventDto.projectId },
                select: { clientId: true },
            });

            if (!project) throw new Error('Project not found');

            const result = await this.prismaService.event.create({
                data: {
                    dueAt: createEventDto.dueAt,
                    name: createEventDto.name,
                    status: createEventDto.status,
                    details: createEventDto.details,
                    link: createEventDto.link,
                    projectId: createEventDto.projectId,
                    isWithTime: createEventDto.isWithTime,
                    clientId: project.clientId,
                    userId: userId,
                },
            });
            return result;
        } catch (error) {
            console.log('error', error);
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
        const date = DateTime.now()
            .setZone('Asia/Bangkok')
            .startOf('day')
            .toUTC()
            .toJSDate();

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
    
            const [total, events] = await Promise.all([
                this.prismaService.event.count({ where }),
                this.prismaService.event.findMany({
                    where,
                    take: 20,
                    orderBy: { dueAt: 'asc' },
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
    
            return { events, total };
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
