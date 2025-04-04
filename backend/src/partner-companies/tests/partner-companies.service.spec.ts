import { Test, TestingModule } from '@nestjs/testing';
import { PartnerCompaniesService } from './partner-companies.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('PartnerCompaniesService', () => {
  let service: PartnerCompaniesService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnerCompaniesService,
        {
          provide: PrismaService,
          useValue: {
            partnerCompany: {
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

    service = module.get(PartnerCompaniesService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('creates a partner company', async () => {
      prisma.partnerCompany.create.mockResolvedValue({ id: '1' });
      const res = await service.create('uid', {
        name: 'Company A',
        taxId: '',
        email: '',
        phoneNumber: '',
        address: '',
        detail: '',
      });
      expect(res.id).toBe('1');
    });

    it('throws on duplicate', async () => {
      prisma.partnerCompany.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('msg', 'P2002', 'partnerCompany'),
      );
      await expect(
        service.create('uid', {
          name: '',
          taxId: '',
          email: '',
          phoneNumber: '',
          address: '',
          detail: '',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws on general error', async () => {
      prisma.partnerCompany.create.mockRejectedValue(new Error());
      await expect(
        service.create('uid', {
          name: '',
          taxId: '',
          email: '',
          phoneNumber: '',
          address: '',
          detail: '',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findMany', () => {
    it('returns partner companies', async () => {
      prisma.partnerCompany.findMany.mockResolvedValue([{ id: '1' }]);
      const res = await service.findMany('uid', {});
      expect(res).toHaveLength(1);
    });

    it('throws on error', async () => {
      prisma.partnerCompany.findMany.mockRejectedValue(new Error());
      await expect(service.findMany('uid', {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('returns partner company', async () => {
      prisma.partnerCompany.findUnique.mockResolvedValue({ id: '1' });
      const res = await service.findOne('uid', '1');
      expect(res.id).toBe('1');
    });

    it('throws NotFound if not exist', async () => {
      prisma.partnerCompany.findUnique.mockResolvedValue(null);
      await expect(service.findOne('uid', 'x')).rejects.toThrow(NotFoundException);
    });

    it('throws on error', async () => {
      prisma.partnerCompany.findUnique.mockRejectedValue(new Error());
      await expect(service.findOne('uid', 'x')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('updates partner company', async () => {
      prisma.partnerCompany.update.mockResolvedValue({ id: '1' });
      const res = await service.update('uid', '1', { name: 'Updated' });
      expect(res.id).toBe('1');
    });

    it('throws if not found', async () => {
      prisma.partnerCompany.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('x', 'P2025', 'partnerCompany'),
      );
      await expect(service.update('uid', 'not-found', { name: 'x' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws on error', async () => {
      prisma.partnerCompany.update.mockRejectedValue(new Error());
      await expect(service.update('uid', '1', { name: 'x' })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('delete', () => {
    it('deletes partner company', async () => {
      prisma.partnerCompany.delete.mockResolvedValue({ id: '1' });
      const res = await service.delete('uid', '1');
      expect(res.id).toBe('1');
    });

    it('throws if not found', async () => {
      prisma.partnerCompany.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('x', 'P2025', 'partnerCompany'),
      );
      await expect(service.delete('uid', 'not-found')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws on error', async () => {
      prisma.partnerCompany.delete.mockRejectedValue(new Error());
      await expect(service.delete('uid', 'x')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
