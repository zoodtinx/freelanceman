import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import {
    CreateSalesDocumentItemDto,
    UpdateSalesDocumentItemDto,
} from '../../../shared/schemas/sales-document-item.schema';

@Injectable()
export class SalesDocumentItemsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createDto: CreateSalesDocumentItemDto) {
        try {
            const result = await this.prismaService.salesDocumentItem.create({
                data: {
                    title: createDto.title,
                    description: createDto.description,
                    rate: createDto.rate,
                    quantity: createDto.quantity,
                    userId: userId,
                    parentDocumentId: createDto.parentDocumentId
                },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'A sales document item with this unique field already exists',
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to create sales document item',
            );
        }
    }

    async findMany(userId: string, documentId: string) {
        try {
            const items = await this.prismaService.salesDocumentItem.findMany({
                where: {
                    parentDocumentId: documentId
                },
            });

            return items;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to find sales document items',
            );
        }
    }

    async findOne(documentId: string, itemId: string) {
        try {
            const item = await this.prismaService.salesDocumentItem.findUnique({
                where: {
                    id: itemId,
                    parentDocumentId: itemId
                },
            });

            if (!item) {
                throw new NotFoundException(
                    `Sales document item with ID ${itemId} not found`,
                );
            }

            return item;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                'Failed to find sales document item',
            );
        }
    }

    async update(
        documentId: string,
        itemId: string,
        updateDto: UpdateSalesDocumentItemDto,
    ) {
        try {
            const result = await this.prismaService.salesDocumentItem.update({
                where: { id: itemId, parentDocumentId: documentId },
                data: updateDto,
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Sales document item with ID ${itemId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to update sales document item',
            );
        }
    }

    async delete(documentId: string, itemId: string) {
        try {
            const result = await this.prismaService.salesDocumentItem.delete({
                where: { id: itemId, parentDocumentId: documentId },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Sales document item with ID ${itemId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to remove sales document item',
            );
        }
    }
}
