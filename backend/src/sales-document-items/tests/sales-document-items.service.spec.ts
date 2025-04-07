import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentItemsService } from 'src/sales-document-items/sales-document-items.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('SalesDocumentItemsService', () => {
    let service: SalesDocumentItemsService;
    let prisma: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SalesDocumentItemsService,
                {
                    provide: PrismaService,
                    useValue: {
                        salesDocumentItem: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SalesDocumentItemsService);
        prisma = module.get(PrismaService);
    });

    describe('create', () => {
        it('creates a sales document item', async () => {
            prisma.salesDocumentItem.create.mockResolvedValue({ id: '1' });
            const result = await service.create('doc-1', {
                description: 'Item A',
                quantity: 1,
                unitPrice: 100,
            });
            expect(result.id).toBe('1');
        });

        it('throws BadRequest on duplicate', async () => {
            prisma.salesDocumentItem.create.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2002',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.create('doc-1', {
                    description: 'Item A',
                    quantity: 1,
                    unitPrice: 100,
                }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws InternalServerError on general error', async () => {
            prisma.salesDocumentItem.create.mockRejectedValue(new Error());
            await expect(
                service.create('doc-1', {
                    description: '',
                    quantity: 1,
                    unitPrice: 0,
                }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('findMany', () => {
        it('returns list of items', async () => {
            prisma.salesDocumentItem.findMany.mockResolvedValue([{ id: '1' }]);
            const result = await service.findMany('uid', 'doc-1');
            expect(result).toHaveLength(1);
        });

        it('throws InternalServerError on error', async () => {
            prisma.salesDocumentItem.findMany.mockRejectedValue(new Error());
            await expect(service.findMany('uid', 'doc-1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('findOne', () => {
        it('returns item if exists', async () => {
            prisma.salesDocumentItem.findUnique.mockResolvedValue({ id: '1' });
            const result = await service.findOne('doc-1', '1');
            expect(result.id).toBe('1');
        });

        it('throws NotFound if item not found', async () => {
            prisma.salesDocumentItem.findUnique.mockResolvedValue(null);
            await expect(service.findOne('doc-1', 'x')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('throws InternalServerError on error', async () => {
            prisma.salesDocumentItem.findUnique.mockRejectedValue(new Error());
            await expect(service.findOne('doc-1', 'x')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('update', () => {
        it('updates and returns item', async () => {
            prisma.salesDocumentItem.update.mockResolvedValue({
                id: '1',
                description: 'Updated',
            });
            const result = await service.update('doc-1', '1', {
                description: 'Updated',
            });
            expect(result.description).toBe('Updated');
        });

        it('throws BadRequest if item not found (P2025)', async () => {
            prisma.salesDocumentItem.update.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.update('doc-1', 'not-found', { description: 'x' }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws InternalServerError on error', async () => {
            prisma.salesDocumentItem.update.mockRejectedValue(new Error());
            await expect(
                service.update('doc-1', '1', { description: 'x' }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('delete', () => {
        it('deletes item', async () => {
            prisma.salesDocumentItem.delete.mockResolvedValue({ id: '1' });
            const result = await service.delete('doc-1', '1');
            expect(result.id).toBe('1');
        });

        it('throws BadRequest if item not found (P2025)', async () => {
            prisma.salesDocumentItem.delete.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(service.delete('doc-1', 'missing')).rejects.toThrow(
                BadRequestException,
            );
        });

        it('throws InternalServerError on general error', async () => {
            prisma.salesDocumentItem.delete.mockRejectedValue(new Error());
            await expect(service.delete('doc-1', 'x')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });
});
