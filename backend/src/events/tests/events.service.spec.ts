import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from 'src/events/events.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('EventsService', () => {
  let service: EventsService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: {
            event: {
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

    service = module.get(EventsService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('creates an event', async () => {
      prisma.event.create.mockResolvedValue({ id: '1' });
      const res = await service.create('uid', {
        name: 'Test',
        dueAt: new Date(),
        status: 'pending',
        details: '',
        link: '',
        projectId: 'pid',
        clientId: 'cid',
      });
      expect(res.id).toBe('1');
    });

    it('throws on duplicate', async () => {
      prisma.event.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('msg', 'P2002', 'event'),
      );
      await expect(
        service.create('uid', {
          name: '',
          dueAt: new Date(),
          status: 'pending',
          details: '',
          link: '',
          projectId: 'pid',
          clientId: 'cid',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws on unknown error', async () => {
      prisma.event.create.mockRejectedValue(new Error());
      await expect(
        service.create('uid', {
          name: '',
          dueAt: new Date(),
          status: 'pending',
          details: '',
          link: '',
          projectId: 'pid',
          clientId: 'cid',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('returns all events', async () => {
      prisma.event.findMany.mockResolvedValue([{ id: '1' }]);
      const res = await service.findAll('uid', {});
      expect(res).toHaveLength(1);
    });

    it('throws on error', async () => {
      prisma.event.findMany.mockRejectedValue(new Error());
      await expect(service.findAll('uid', {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('returns event', async () => {
      prisma.event.findUnique.mockResolvedValue({ id: '1' });
      const res = await service.findOne('uid', '1');
      expect(res.id).toBe('1');
    });

    it('throws NotFound if not exists', async () => {
      prisma.event.findUnique.mockResolvedValue(null);
      await expect(service.findOne('uid', 'x')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws on other errors', async () => {
      prisma.event.findUnique.mockRejectedValue(new Error());
      await expect(service.findOne('uid', '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('updates and returns event', async () => {
      prisma.event.update.mockResolvedValue({});
      prisma.event.findUnique.mockResolvedValue({ id: '1' });
      const res = await service.update('uid', '1', { name: 'Updated' });
      expect(res.id).toBe('1');
    });

    it('throws on error', async () => {
      prisma.event.update.mockRejectedValue(new Error());
      await expect(service.update('uid', '1', { name: 'x' })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('remove', () => {
    it('removes event', async () => {
      prisma.event.delete.mockResolvedValue({});
      const res = await service.remove('uid', '1');
      expect(res).toEqual({ success: true });
    });

    it('throws on error', async () => {
      prisma.event.delete.mockRejectedValue(new Error());
      await expect(service.remove('uid', '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
