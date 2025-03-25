import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateSalesDocumentDto } from './dto/create-sales-document.dto';
import { UpdateSalesDocumentDto } from './dto/update-sales-document.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { SalesDocumentFilter } from './dto/find-sales-document.dto';

@Injectable()
export class SalesDocumentsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createDto: CreateSalesDocumentDto) {
        try {
            const result = await this.prismaService.salesDocument.create({
                data: {
                    ...createDto,
                    userId,
                },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'A sales document with this unique field already exists',
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to create sales document',
            );
        }
    }

    async findMany(userId: string, filter: SalesDocumentFilter) {
        try {
            const documents = await this.prismaService.salesDocument.findMany({
                where: {
                    userId,
                    title: filter.title
                        ? { contains: filter.title, mode: 'insensitive' }
                        : undefined,
                    partnerCompanyId: filter.partnerCompanyId || undefined,
                },
                include: {
                    partnerCompany: {
                        select: { id: true, name: true },
                    },
                },
            });

            return documents;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to find sales documents',
            );
        }
    }

    async findOne(userId: string, documentId: string) {
        try {
            const document = await this.prismaService.salesDocument.findUnique({
                where: { id: documentId, userId },
                include: {
                    partnerCompany: {
                        select: { id: true, name: true },
                    },
                },
            });

            if (!document) {
                throw new NotFoundException(
                    `Sales document with ID ${documentId} not found`,
                );
            }

            return document;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                'Failed to find sales document',
            );
        }
    }

    async update(
        userId: string,
        documentId: string,
        updateDto: UpdateSalesDocumentDto,
    ) {
        try {
            const result = await this.prismaService.salesDocument.update({
                where: { id: documentId, userId },
                data: updateDto,
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Sales document with ID ${documentId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to update sales document',
            );
        }
    }

    async delete(userId: string, documentId: string) {
        try {
            const result = await this.prismaService.salesDocument.delete({
                where: { id: documentId, userId },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Sales document with ID ${documentId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to remove sales document',
            );
        }
    }
}
