import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentsService } from 'src/sales-documents/sales-documents.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { FilesService } from 'src/files/files.service';
import { S3Service } from 'src/shared/s3/s3.service';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Readable } from 'stream';

jest.mock('src/sales-documents/helpers/pdf-utils', () => ({
    generatePDFStream: jest.fn(() => new Readable({ read() {} })),
}));

describe('SalesDocumentsService', () => {
    let service: SalesDocumentsService;
    let prisma: any;
    let s3: any;
    let files: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SalesDocumentsService,
                {
                    provide: PrismaService,
                    useValue: {
                        salesDocument: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                    },
                },
                {
                    provide: S3Service,
                    useValue: {
                        uploadAndGetSignedUrl: jest.fn(),
                    },
                },
                {
                    provide: FilesService,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get(SalesDocumentsService);
        prisma = module.get(PrismaService);
        s3 = module.get(S3Service);
        files = module.get(FilesService);
    });

    describe('create', () => {
        it('creates a sales document', async () => {
            prisma.salesDocument.create.mockResolvedValue({ id: '1' });
            const result = await service.create('uid', {
                title: 'Doc A',
                issuedAt: new Date().toISOString(),
            } as any);
            expect(result.id).toBe('1');
        });

        it('throws BadRequest on duplicate', async () => {
            prisma.salesDocument.create.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2002',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.create('uid', {
                    title: '',
                    issuedAt: new Date().toISOString(),
                } as any),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws on general error', async () => {
            prisma.salesDocument.create.mockRejectedValue(new Error());
            await expect(
                service.create('uid', {
                    title: '',
                    issuedAt: new Date().toISOString(),
                } as any),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('findMany', () => {
        it('returns documents', async () => {
            prisma.salesDocument.findMany.mockResolvedValue([{ id: '1' }]);
            const result = await service.findMany('uid', {});
            expect(result.length).toBe(1);
        });

        it('throws on error', async () => {
            prisma.salesDocument.findMany.mockRejectedValue(new Error());
            await expect(service.findMany('uid', {})).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('findOne', () => {
        it('returns document', async () => {
            prisma.salesDocument.findUnique.mockResolvedValue({ id: '1' });
            const result = await service.findOne('uid', '1');
            expect(result.id).toBe('1');
        });

        it('throws NotFound if missing', async () => {
            prisma.salesDocument.findUnique.mockResolvedValue(null);
            await expect(service.findOne('uid', 'missing')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('throws on query error', async () => {
            prisma.salesDocument.findUnique.mockRejectedValue(new Error());
            await expect(service.findOne('uid', 'x')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('update', () => {
        it('updates document', async () => {
            prisma.salesDocument.update.mockResolvedValue({ id: '1' });
            const result = await service.update('uid', '1', {
                title: 'Updated',
            });
            expect(result.id).toBe('1');
        });

        it('throws BadRequest if not found', async () => {
            prisma.salesDocument.update.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.update('uid', 'missing', { title: 'x' }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws on error', async () => {
            prisma.salesDocument.update.mockRejectedValue(new Error());
            await expect(service.update('uid', 'x', {})).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('delete', () => {
        it('deletes document', async () => {
            prisma.salesDocument.delete.mockResolvedValue({ id: '1' });
            const result = await service.delete('uid', '1');
            expect(result.id).toBe('1');
        });

        it('throws BadRequest if not found', async () => {
            prisma.salesDocument.delete.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(service.delete('uid', 'missing')).rejects.toThrow(
                BadRequestException,
            );
        });

        it('throws on other error', async () => {
            prisma.salesDocument.delete.mockRejectedValue(new Error());
            await expect(service.delete('uid', 'x')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('createPdf', () => {
        it('uploads and creates PDF file', async () => {
            s3.uploadAndGetSignedUrl.mockResolvedValue({
                key: 'pdf-key',
                signedUrl: 'https://example.com/pdf',
            });

            files.create.mockResolvedValue({ link: 'https://example.com/pdf' });

            const result = await service.createPdf('uid', {
                title: 'Invoice',
                number: 'INV001',
                clientId: 'cid',
                projectId: 'pid',
            });

            expect(result.url).toBe('https://example.com/pdf');
        });

        it('throws if S3 upload fails', async () => {
            s3.uploadAndGetSignedUrl.mockRejectedValue(new Error('S3 fail'));
            await expect(
                service.createPdf('uid', {
                    title: 'fail',
                    number: 'INV001',
                    clientId: '',
                    projectId: '',
                }),
            ).rejects.toThrow(InternalServerErrorException);
        });

        it('throws if file record creation fails', async () => {
            s3.uploadAndGetSignedUrl.mockResolvedValue({
                key: 'k',
                signedUrl: 'url',
            });
            files.create.mockRejectedValue(new Error('db fail'));
            await expect(
                service.createPdf('uid', {
                    title: 'fail',
                    number: 'INV001',
                    clientId: '',
                    projectId: '',
                }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });
});
