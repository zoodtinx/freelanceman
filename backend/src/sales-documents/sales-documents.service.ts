import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import {
    SearchSalesDocumentDto,
    UpdateSalesDocumentDto,
    CreateSalesDocumentDto,
} from 'src/shared/zod-schemas/sales-document.schema';

@Injectable()
export class SalesDocumentsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createDto: CreateSalesDocumentDto) {
        try {
            const result = await this.prismaService.salesDocument.create({
                data: {
                    title: createDto.title,
                    category: createDto.category,
                    number: createDto.number,
                    issuedAt: new Date(createDto.issuedAt),
                    currency: createDto.currency,
                    referenceNumber: createDto.referenceNumber,
                    note: createDto.note,

                    projectId: createDto.projectId,
                    projectDescription: createDto.projectDescription,
                    selectedProjectClientId: createDto.selectedProjectClientId,

                    freelancerName: createDto.freelancerName,
                    freelancerEmail: createDto.freelancerEmail,
                    freelancerPhone: createDto.freelancerPhone,
                    freelancerTaxId: createDto.freelancerTaxId,
                    freelancerDetail: createDto.freelancerDetail,

                    clientId: createDto.clientId,
                    clientName: createDto.clientName,
                    clientTaxId: createDto.clientTaxId,
                    clientAddress: createDto.clientAddress,
                    clientPhone: createDto.clientPhone,
                    clientOffice: createDto.clientOffice,
                    clientDetail: createDto.clientDetail,

                    subtotal: createDto.subtotal,
                    discount: createDto.discount ?? null,
                    tax: createDto.tax,
                    total: createDto.total,
                    customAdjustment: createDto.customAdjustment ?? null,

                    userId: userId,
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

    async findMany(userId: string, filter: SearchSalesDocumentDto) {
        try {
            const documents = await this.prismaService.salesDocument.findMany({
                where: {
                    userId,
                    title: filter.title
                        ? { contains: filter.title, mode: 'insensitive' }
                        : undefined,
                    category: filter.category
                        ? { contains: filter.category, mode: 'insensitive' }
                        : undefined,
                    projectId: filter.projectId || undefined,
                    selectedProjectClientId:
                        filter.selectedProjectClientId || undefined,
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
