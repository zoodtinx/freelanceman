import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import {
    SalesDocumentFilterDto,
    EditSalesDocumentDto,
    CreateSalesDocumentDto,
    CreatePdfDto,
} from 'freelanceman-common';
import { S3Service } from 'src/shared/s3/s3.service';
import { FilesService } from 'src/files/files.service';
import { Readable } from 'stream';
import { generatePDFBuffer } from '@/sales-documents/helpers/pdf-utils';

@Injectable()
export class SalesDocumentsService {
    constructor(
        private prismaService: PrismaService,
        private s3Service: S3Service,
        private fileService: FilesService,
    ) {}

    async create(userId: string, createDto: CreateSalesDocumentDto) {
        try {
            const result = await this.prismaService.salesDocument.create({
                data: {
                    userId,
                    category: createDto.category,
                    issuedAt: new Date(createDto.issuedAt),
                    projectId: createDto.projectId,
                    freelancerName: createDto.freelancerName,
                    clientId: createDto.clientId,
                    clientName: createDto.clientName,

                    title: createDto.title,
                    number: createDto.number,
                    currency: createDto.currency,
                    referenceNumber: createDto.referenceNumber,
                    projectDescription: createDto.projectDescription,

                    freelancerEmail: createDto.freelancerEmail,
                    freelancerPhone: createDto.freelancerPhone,
                    freelancerTaxId: createDto.freelancerTaxId,
                    freelancerAddress: createDto.freelancerAddress,

                    clientTaxId: createDto.clientTaxId,
                    clientAddress: createDto.clientAddress,
                    clientPhone: createDto.clientPhone,
                    clientOffice: createDto.clientOffice,
                    clientDetail: createDto.clientDetail,

                    tax: createDto.tax,
                    discountPercent: createDto.discountPercent,
                    discountFlat: createDto.discountFlat,

                    note: createDto.note,

                    items: {
                        create: createDto.items.map((item) => ({
                            userId,
                            title: item.title,
                            rate: item.rate,
                            quantity: item.quantity,
                            description: item.description,
                        })),
                    },
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

    async findMany(userId: string, filter: SalesDocumentFilterDto) {
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
                    projectId: filter.projectId,
                    clientId: filter.clientId,
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
                    items: true,
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
        updateDto: EditSalesDocumentDto,
    ) {
        console.log('documentId', documentId)
        try {
            const { items, ...dto } = updateDto;

            if (items.length > 0) {
                await this.prismaService.salesDocumentItem.deleteMany({
                    where: {
                        parentDocumentId: documentId
                    }
                })
            }

            const result = await this.prismaService.salesDocument.update({
                where: { id: documentId, userId },
                data: {
                    ...dto,
                    items: items
                        ? {
                            create: updateDto.items.map((item) => ({
                                userId,
                                title: item.title,
                                rate: item.rate,
                                quantity: item.quantity,
                                description: item.description,
                            })),
                          }
                        : undefined,
                },
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
                error
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

    async createPdf(userId: string, createPdfDto: CreatePdfDto) {
        console.log('createPdfDto', createPdfDto);
        const pdfBuffer = (await generatePDFBuffer(
            createPdfDto,
        )) as unknown as Readable;

        const formattedFilename = createPdfDto.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const fileName = `${formattedFilename}.pdf`;

        const s3Response = await this.s3Service.uploadAndGetSignedUrl({
            file: pdfBuffer,
            fileName,
            category: `sales-document/${createPdfDto.category}`,
            contentType: 'application/pdf',
        });

        await this.prismaService.salesDocument.update({
            where: {
                id: createPdfDto.id,
            },
            data: {
                fileKey: s3Response.key,
            },
        });

        return { pdfUrl: s3Response.signedUrl };
    }
}
