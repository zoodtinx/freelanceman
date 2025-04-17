import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    CreatePartnerCompanyDto,
    EditPartnerCompanyDto,
    PartnerCompanyFilterDto,
} from 'freelanceman-common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PartnerCompaniesService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createDto: CreatePartnerCompanyDto) {
        try {
            const result = await this.prismaService.partnerCompany.create({
                data: {
                    userId,
                    name: createDto.name,
                    taxId: createDto.taxId,
                    email: createDto.email,
                    phoneNumber: createDto.phoneNumber,
                    address: createDto.address,
                    detail: createDto.detail,
                },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'A partner company with this unique field already exists',
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to create partner company',
            );
        }
    }

    async findMany(userId: string, filter: PartnerCompanyFilterDto) {
        try {
            const companies = await this.prismaService.partnerCompany.findMany({
                where: {
                    userId,
                    name: filter.name
                        ? { contains: filter.name, mode: 'insensitive' }
                        : undefined,
                },
            });

            return companies;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to find partner companies',
            );
        }
    }

    async findOne(userId: string, companyId: string) {
        try {
            const company = await this.prismaService.partnerCompany.findUnique({
                where: { id: companyId, userId },
            });

            if (!company) {
                throw new NotFoundException(
                    `Partner company with ID ${companyId} not found`,
                );
            }

            return company;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                'Failed to find partner company',
            );
        }
    }

    async update(
        userId: string,
        companyId: string,
        updateDto: EditPartnerCompanyDto,
    ) {
        try {
            const result = await this.prismaService.partnerCompany.update({
                where: { id: companyId, userId },
                data: updateDto,
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Partner company with ID ${companyId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to update partner company',
            );
        }
    }

    async delete(userId: string, companyId: string) {
        try {
            const result = await this.prismaService.partnerCompany.delete({
                where: { id: companyId, userId },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Partner company with ID ${companyId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to remove partner company',
            );
        }
    }
}
