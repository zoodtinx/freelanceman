import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { ClientFilter } from 'src/clients/dto/find-client.dto';

@Injectable()
export class ClientsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createClientDto: CreateClientDto) {
        try {
            const result = await this.prismaService.client.create({
                data: {
                    ...createClientDto,
                    userId,
                },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'A client with this unique field already exists',
                    );
                }
            }
            throw new InternalServerErrorException('Failed to create client');
        }
    }

    async findMany(userId: string, filter: ClientFilter) {
        try {
            const clients = await this.prismaService.client.findMany({
                where: {
                    userId,
                    name: filter.name
                        ? { contains: filter.name, mode: 'insensitive' }
                        : undefined,
                    projects:
                        filter.hasActiveProject === true
                            ? { some: {} }
                            : filter.hasActiveProject === false
                              ? { none: {} }
                              : undefined,
                },
                include: {
                    projects: {
                        where: {
                            projectStatus: 'active',
                        },
                        select: {
                            id: true,
                        },
                    },
                },
            });

            console.log('clients length', clients.length)

            return clients;
        } catch (error) {
            throw new InternalServerErrorException('Failed to find client');
        }
    }

    async findOne(userId: string, clientId: string) {
        try {
            const client = await this.prismaService.client.findUnique({
                where: { id: clientId, userId },
                include: {
                    projects: {
                        where: { projectStatus: 'active' },
                        select: { id: true },
                    },
                },
            });

            if (!client) {
                throw new NotFoundException(`Client with ID ${clientId} not found`);
            }

            return client;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to find client');
        }
    }

    async update(
        userId: string,
        clientId: string,
        updateClientDto: UpdateClientDto,
    ) {
        try {
            const result = await this.prismaService.client.update({
                where: { id: clientId, userId },
                data: updateClientDto,
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Client with ID ${clientId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException('Failed to find client');
        }
    }

    async delete(userId: string, clientId: string) {
        try {
            const result = await this.prismaService.client.delete({
                where: { id: clientId, userId },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Client with ID ${clientId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException('Failed to remove client');
        }
    }
}
