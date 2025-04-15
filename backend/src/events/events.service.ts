import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    CreateEventDto,
    UpdateEventDto,
    EventFilterDto,
} from '@schemas';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createEventDto: CreateEventDto) {
        try {
            const result = await this.prismaService.event.create({
                data: {
                    dueAt: createEventDto.dueAt,
                    name: createEventDto.name,
                    status: createEventDto.status,
                    details: createEventDto.details,
                    link: createEventDto.link,
                    projectId: createEventDto.projectId,
                    clientId: createEventDto.clientId,
                    userId: userId,
                },
            });
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
        try {
            const result = await this.prismaService.event.findMany({
                where: {
                    userId: userId,
                    name: {
                        contains: filter.name,
                    },
                    status: filter.status,
                    dueAt: filter.dueAt,
                    projectId: filter.projectId,
                    clientId: filter.clientId,
                },
                orderBy: {
                  dueAt: 'asc'
              }
            });
            return result;
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

    async update(
        userId: string,
        eventId: string,
        updateEventDto: UpdateEventDto,
    ) {
        try {
            await this.prismaService.event.update({
                where: { id: eventId, userId },
                data: updateEventDto,
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
