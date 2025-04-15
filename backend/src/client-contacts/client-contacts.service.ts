import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    CreateClientContactDto,
    ClientContactFilterDto,
    UpdateClientContactDto,
} from '@schemas';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientContactService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, dto: CreateClientContactDto) {
        try {
            const result = await this.prismaService.clientContact.create({
                data: {
                    name: dto.name,
                    companyId: dto.companyId,
                    role: dto.role,
                    phoneNumber: dto.phoneNumber,
                    email: dto.email,
                    details: dto.detail ?? '',
                    avatar: dto.avatar ?? '',
                    userId,
                },
            });
            return result;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException('Client contact already exists');
            }
            console.log('error', error)
            throw new InternalServerErrorException(
                'Failed to create client contact',
            );
        }
    }

    async findAll(userId: string, filter: ClientContactFilterDto) {
        try {
            const result = await this.prismaService.clientContact.findMany({
                where: {
                    userId,
                    id: filter.id,
                    name: filter.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
                    companyId: filter.companyId,
                    email: filter.email,
                    phoneNumber: filter.phoneNumber,
                },
            });
            return result;
        } catch {
            throw new InternalServerErrorException(
                'Failed to search client contacts',
            );
        }
    }

    async findOne(userId: string, id: string) {
        try {
            const contact = await this.prismaService.clientContact.findUnique({
                where: { id, userId },
            });
            if (!contact) {
                throw new NotFoundException(
                    `Client contact with ID ${id} not found`,
                );
            }
            return contact;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                'Failed to find client contact',
            );
        }
    }

    async update(userId: string, id: string, dto: UpdateClientContactDto) {
        try {
            await this.prismaService.clientContact.update({
                where: { id, userId },
                data: {
                    name: dto.name,
                    role: dto.role,
                    phoneNumber: dto.phoneNumber,
                    email: dto.email,
                    details: dto.details,
                    avatar: dto.avatar,
                },
            });
            return this.findOne(userId, id);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException('Client contact not found');
            } else {
                throw new InternalServerErrorException(
                    'Failed to update client contact',
                );
            }
        }
    }

    async remove(userId: string, id: string) {
        try {
            const result = await this.prismaService.clientContact.delete({
                where: { id, userId },
            });

            return result
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException('Client contact not found');
            } else {
                throw new InternalServerErrorException(
                    'Failed to delete client contact',
                );
            }
        }
    }
}
