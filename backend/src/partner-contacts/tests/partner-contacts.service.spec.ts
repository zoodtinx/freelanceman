import { Test, TestingModule } from '@nestjs/testing';
import { PartnerContactService } from './partner-contact.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('PartnerContactService', () => {
  let service: PartnerContactService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnerContactService,
        {
          provide: PrismaService,
          useValue: {
            partnerContact: {
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

    service = module.get(PartnerContactService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('creates contact', async () => {
      prisma.partnerContact.create.mockResolvedValue({ id: '1' });
      const result = await service.create('uid', {
        name: 'Test',
        companyId: 'company-id',
        role: 'Manager',
        phoneNumber: '1234',
        email: 'email@test.com',
        detail: '',
        avatar: '',
      });
      expect(result.id).toBe('1');
    });

    it('throws BadRequest on duplicate', async () => {
      prisma.partnerContact.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('msg', 'P2002', 'partnerContact'),
      );
      await expect(service.create('uid', {} as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws InternalServerError on other error', async () => {
      prisma.partnerContact.create.mockRejectedValue(new Error());
      await expect(service.create('uid', {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findMany', () => {
    it('returns contacts', async () => {
      prisma.partnerContact.findMany.mockResolvedValue([{ id: '1' }]);
      const result = await service.findMany('uid', {});
      expect(result).toHaveLength(1);
    });

    it('throws InternalServerError on error', async () => {
      prisma.partnerContact.findMany.mockRejectedValue(new Error());
      await expect(service.findMany('uid', {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('returns a contact', async () => {
      prisma.partnerContact.findUnique.mockResolvedValue({ id: '1' });
      const result = await service.findOne('uid', '1');
      expect(result.id).toBe('1');
    });

    it('throws NotFound if contact does not exist', async () => {
      prisma.partnerContact.findUnique.mockResolvedValue(null);
      await expect(service.findOne('uid', 'x')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws InternalServerError on other error', async () => {
      prisma.partnerContact.findUnique.mockRejectedValue(new Error());
      await expect(service.findOne('uid', 'x')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('updates and returns contact', async () => {
      prisma.partnerContact.update.mockResolvedValue({});
      prisma.partnerContact.findUnique.mockResolvedValue({ id: '1' });
      const result = await service.update('uid', '1', {
        name: 'Updated',
        role: 'Designer',
        phoneNumber: '999',
        email: 'new@test.com',
        details: '',
        avatar: '',
      });
      expect(result.id).toBe('1');
    });

    it('throws InternalServerError on failure', async () => {
      prisma.partnerContact.update.mockRejectedValue(new Error());
      await expect(
        service.update('uid', '1', {} as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('deletes contact', async () => {
      prisma.partnerContact.delete.mockResolvedValue({});
      const result = await service.remove('uid', '1');
      expect(result).toEqual({ success: true });
    });

    it('throws InternalServerError on failure', async () => {
      prisma.partnerContact.delete.mockRejectedValue(new Error());
      await expect(service.remove('uid', '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
