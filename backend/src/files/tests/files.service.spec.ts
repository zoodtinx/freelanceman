import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { S3Service } from 'src/shared/s3/s3.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('FilesService', () => {
  let service: FilesService;
  let prisma: any;
  let s3: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: PrismaService,
          useValue: {
            file: {
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
            getPresignedUrl: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
        { provide: 'ConfigService', useValue: {} },
      ],
    }).compile();

    service = module.get(FilesService);
    prisma = module.get(PrismaService);
    s3 = module.get(S3Service);
  });

  describe('create', () => {
    it('creates file', async () => {
      prisma.file.create.mockResolvedValue({ id: '1' });
      const res = await service.create('uid', {
        originalName: 'x.pdf',
        displayName: 'file',
        type: 'pdf',
        category: 'invoice',
        link: 'link',
        size: 123,
        projectId: 'pid',
        clientId: 'cid',
      });
      expect(res.id).toBe('1');
    });

    it('throws on duplicate', async () => {
      prisma.file.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('x', 'P2002', 'file'),
      );
      await expect(service.create('uid', {} as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws on general error', async () => {
      prisma.file.create.mockRejectedValue(new Error());
      await expect(service.create('uid', {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getUploadUrl', () => {
    it('returns presigned url', async () => {
      s3.getPresignedUrl.mockResolvedValue('url');
      const res = await service.getUploadUrl({
        fileName: 'a.jpg',
        category: 'brief',
        contentType: 'image/jpeg',
      });
      expect(res).toBe('url');
    });

    it('throws on failure', async () => {
      s3.getPresignedUrl.mockRejectedValue(new Error());
      await expect(
        service.getUploadUrl({ fileName: '', category: '', contentType: '' }),
      ).rejects.toThrow('Failed to get upload URL');
    });
  });

  describe('findMany', () => {
    it('returns files', async () => {
      prisma.file.findMany.mockResolvedValue([{ id: '1' }]);
      const res = await service.findMany('uid', {});
      expect(res).toHaveLength(1);
    });

    it('throws on error', async () => {
      prisma.file.findMany.mockRejectedValue(new Error());
      await expect(service.findMany('uid', {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('returns file', async () => {
      prisma.file.findUnique.mockResolvedValue({ id: '1' });
      const res = await service.findOne('uid', '1');
      expect(res.id).toBe('1');
    });

    it('throws NotFound if not exist', async () => {
      prisma.file.findUnique.mockResolvedValue(null);
      await expect(service.findOne('uid', 'x')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws on error', async () => {
      prisma.file.findUnique.mockRejectedValue(new Error());
      await expect(service.findOne('uid', '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('updates file', async () => {
      prisma.file.update.mockResolvedValue({ id: '1' });
      const res = await service.update('uid', '1', { displayName: 'new' });
      expect(res.id).toBe('1');
    });

    it('throws if not found', async () => {
      prisma.file.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('x', 'P2025', 'file'),
      );
      await expect(
        service.update('uid', 'not-found', { displayName: 'x' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws on error', async () => {
      prisma.file.update.mockRejectedValue(new Error());
      await expect(service.update('uid', '1', {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('delete', () => {
    it('deletes file', async () => {
      prisma.file.findUnique.mockResolvedValue({ s3Key: 'abc' });
      prisma.file.delete.mockResolvedValue({ id: '1' });
      const res = await service.delete('uid', '1');
      expect(res.id).toBe('1');
    });

    it('throws if not found (P2025)', async () => {
      prisma.file.findUnique.mockResolvedValue({ s3Key: 'abc' });
      prisma.file.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('x', 'P2025', 'file'),
      );
      await expect(service.delete('uid', 'bad')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws on other error', async () => {
      prisma.file.findUnique.mockResolvedValue({ s3Key: 'abc' });
      prisma.file.delete.mockRejectedValue(new Error());
      await expect(service.delete('uid', '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
