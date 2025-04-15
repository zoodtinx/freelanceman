// files.service.spec.ts
import { Test } from '@nestjs/testing';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { S3Service } from 'src/shared/s3/s3.service';
import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '@types';
import { CreateFileDto } from '../../../../shared/schemas/file.schema';

describe('FilesService', () => {
    let service: FilesService;
    let prisma: {
        file: {
            create: jest.Mock;
            findMany: jest.Mock;
            findUnique: jest.Mock;
            update: jest.Mock;
            delete: jest.Mock;
        };
    };
    let s3: jest.Mocked<S3Service>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FilesService,
                {
                    provide: PrismaService,
                    useValue: {
                        file: {
                            create: jest.fn() as jest.Mock,
                            findMany: jest.fn() as jest.Mock,
                            findUnique: jest.fn() as jest.Mock,
                            update: jest.fn() as jest.Mock,
                            delete: jest.fn() as jest.Mock,
                        },
                    },
                },
                {
                    provide: S3Service,
                    useValue: {
                        getPresignedUrl: jest.fn(),
                        deleteFile: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get(FilesService);
        prisma = module.get(PrismaService);
        s3 = module.get(S3Service);
    });

    it('should create a file', async () => {
        const mockDto: CreateFileDto = {
            originalName: 'original.txt',
            displayName: 'Display',
            category: 'asset',
            type: 'archive',
            link: 'https://example.com',
            projectId: 'project1',
            clientId: 'client1',
            size: 123,
        };

        const result = { id: 'file1', ...mockDto, userId: 'user1' };
        prisma.file.create.mockResolvedValue(result);

        expect(await service.create('user1', mockDto)).toEqual(result);
    });

    it('should throw on duplicate file', async () => {
        prisma.file.create.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError(
                'A client with this unique field already exists',
                {
                    code: 'P2002',
                    clientVersion: '4.0.0',
                },
            ),
        );

        await expect(service.create('user1', {} as any)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should return a presigned URL', async () => {
        const dto = {
            fileName: 'file.txt',
            category: 'docs',
            contentType: 'text/plain',
        };
        s3.getPresignedUrl.mockResolvedValue('presigned-url');

        expect(await service.getUploadUrl(dto)).toBe('presigned-url');
    });

    it('should find many files', async () => {
        const result = [{ id: 'f1' }];
        prisma.file.findMany.mockResolvedValue(result);

        expect(await service.findMany('u1', {} as any)).toEqual(result);
    });

    it('should update a file', async () => {
        const dto = { displayName: 'New Name' };
        const result = { id: 'f1', ...dto };
        prisma.file.update.mockResolvedValue(result);

        expect(await service.update('u1', 'f1', dto)).toEqual(result);
    });

    it('should delete a file', async () => {
        prisma.file.findUnique.mockResolvedValue({ s3Key: 'key1' } as any);
        s3.deleteFile.mockResolvedValue(undefined);
        prisma.file.delete.mockResolvedValue({ id: 'f1' });

        expect(await service.delete('u1', 'f1')).toEqual({ id: 'f1' });
    });
});
