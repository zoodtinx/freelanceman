import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    CreatePartnerContactDto,
    PartnerContactFilterDto,
    EditPartnerContactDto,
} from 'freelanceman-common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PartnerContactService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, dto: CreatePartnerContactDto) {
        try {
            const result = await this.prismaService.partnerContact.create({
                data: {
                    name: dto.name,
                    company: dto.company ? dto.company : undefined,
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
                throw new BadRequestException('Partner contact already exists');
            }
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to create partner contact',
            );
        }
    }

    async findMany(userId: string, partnerFilter: PartnerContactFilterDto) {
        const { projectId, ...filter } = partnerFilter;

        try {
            const where = {
                userId,
                name: filter.name
                    ? { contains: filter.name, mode: 'insensitive' as const }
                    : undefined,
                role: filter.role
                    ? { contains: filter.role, mode: 'insensitive' as const }
                    : undefined,
                company: filter.company
                    ? {
                          contains: filter.company,
                          mode: 'insensitive' as const,
                      }
                    : undefined,
                projects: projectId
                    ? {
                          some: {
                              projectId,
                          },
                      }
                    : undefined,
            };

            const [total, items] = await Promise.all([
                this.prismaService.partnerContact.count({ where }),
                this.prismaService.partnerContact.findMany({
                    where,
                    take: filter.take ? filter.take : 20,
                    orderBy: { name: 'asc' },
                }),
            ]);

            return { items, total };
        } catch {
            throw new InternalServerErrorException(
                'Failed to search partner contacts',
            );
        }
    }

    async findOne(userId: string, id: string) {
        try {
            const contact = await this.prismaService.partnerContact.findUnique({
                where: { id, userId },
            });
            if (!contact) {
                throw new NotFoundException(
                    `Partner contact with ID ${id} not found`,
                );
            }
            return contact;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                'Failed to find partner contact',
            );
        }
    }

    async update(userId: string, id: string, dto: EditPartnerContactDto) {
        try {
            await this.prismaService.partnerContact.update({
                where: { id, userId },
                data: {
                    name: dto.name,
                    role: dto.role,
                    phoneNumber: dto.phoneNumber,
                    email: dto.email,
                    details: dto.detail,
                    avatar: dto.avatar,
                },
            });
            return this.findOne(userId, id);
        } catch {
            throw new InternalServerErrorException(
                'Failed to update partner contact',
            );
        }
    }

    async remove(userId: string, id: string) {
        try {
            await this.prismaService.partnerContact.delete({
                where: { id, userId },
            });
            return { success: true };
        } catch {
            throw new InternalServerErrorException(
                'Failed to delete partner contact',
            );
        }
    }
}
