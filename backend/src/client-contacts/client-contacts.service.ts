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
    EditClientContactDto,
} from 'freelanceman-common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientContactService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createClientContactDto: CreateClientContactDto) {
        try {
            const result = await this.prismaService.clientContact.create({
                data: {
                    name: createClientContactDto.name,
                    companyId: createClientContactDto.companyId,
                    role: createClientContactDto.role,
                    phoneNumber: createClientContactDto.phoneNumber,
                    email: createClientContactDto.email && createClientContactDto.email,
                    details: createClientContactDto.detail ?? '',
                    avatar: createClientContactDto.avatar ?? '',
                    userId,
                },
            });
            return result;
        } catch (error) {
            console.log('error', error)
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

   async findAll(userId: string, contactFilter: ClientContactFilterDto) {
    const { projectId, ...filter } = contactFilter;

    console.log('contactFilter', contactFilter)

    try {
        const where = {
            userId,
            id: filter.id,
            name: filter.name
                ? { contains: filter.name, mode: 'insensitive' as const }
                : undefined,
            companyId: filter.companyId,
            email: filter.email,
            phoneNumber: filter.phoneNumber,
            projects: projectId
                ? {
                      some: {
                          projectId,
                      },
                  }
                : undefined,
        };

        const [total, items] = await Promise.all([
            this.prismaService.clientContact.count({ where }),
            this.prismaService.clientContact.findMany({
                where,
                take: filter.take ? filter.take : 15,
                include: {
                    company: true,
                },
            }),
        ]);

        return { items, total };
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

    async update(userId: string, id: string, dto: EditClientContactDto) {
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
