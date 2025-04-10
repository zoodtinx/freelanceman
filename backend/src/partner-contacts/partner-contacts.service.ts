import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    CreatePartnerContactDto,
    SearchPartnerContactDto,
    UpdatePartnerContactDto,
} from 'src/shared/zod-schemas/partner-contact.schema';
import { Prisma } from '@prisma/client';

@Injectable()
export class PartnerContactService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, dto: CreatePartnerContactDto) {
        try {
            const result = await this.prismaService.partnerContact.create({
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
                throw new BadRequestException('Partner contact already exists');
            }
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to create partner contact',
            );
        }
    }

    async findMany(userId: string, filter: SearchPartnerContactDto) {
        try {
            const result = await this.prismaService.partnerContact.findMany({
                where: {
                    userId,
                    name: filter.name ? { contains: filter.name } : undefined,
                    companyId: filter.companyId,
                    role: filter.role,
                },
                orderBy: {
                  name: 'asc'
                },
                include: {
                  company: {
                      select: {
                          name: true
                      }
                  }
              }
            });
            return result;
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

    async update(userId: string, id: string, dto: UpdatePartnerContactDto) {
        try {
            await this.prismaService.partnerContact.update({
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
