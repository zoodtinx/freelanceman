import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from 'src/tasks/tasks.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
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

    service = module.get(TasksService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('creates a task', async () => {
      prisma.task.create.mockResolvedValue({ id: '1' });
      const result = await service.create('uid', {
        name: 'Test Task',
        dueAt: new Date(),
        status: 'todo',
        details: '',
        link: '',
        projectId: 'pid',
      });
      expect(result.id).toBe('1');
    });

    it('throws BadRequest on duplicate task', async () => {
      prisma.task.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('x', 'P2002', 'task'),
      );
      await expect(
        service.create('uid', {} as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws InternalServerError on general error', async () => {
      prisma.task.create.mockRejectedValue(new Error());
      await expect(service.create('uid', {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('returns tasks list', async () => {
      prisma.task.findMany.mockResolvedValue([{ id: '1' }]);
      const result = await service.findAll('uid', {});
      expect(result.length).toBe(1);
    });

    it('throws InternalServerError on error', async () => {
      prisma.task.findMany.mockRejectedValue(new Error());
      await expect(service.findAll('uid', {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('returns a task', async () => {
      prisma.task.findUnique.mockResolvedValue({ id: '1' });
      const result = await service.findOne('uid', '1');
      expect(result.id).toBe('1');
    });

    it('throws NotFoundException if not found', async () => {
      prisma.task.findUnique.mockResolvedValue(null);
      await expect(service.findOne('uid', 'missing')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws InternalServerError on error', async () => {
      prisma.task.findUnique.mockRejectedValue(new Error());
      await expect(service.findOne('uid', 'x')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('updates and returns updated task', async () => {
      prisma.task.update.mockResolvedValue({});
      prisma.task.findUnique.mockResolvedValue({ id: '1', name: 'Updated' });
      const result = await service.update('uid', '1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('throws InternalServerError on failure', async () => {
      prisma.task.update.mockRejectedValue(new Error());
      await expect(
        service.update('uid', '1', { name: 'X' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('removes a task', async () => {
      prisma.task.delete.mockResolvedValue({});
      const result = await service.remove('uid', '1');
      expect(result).toEqual({ success: true });
    });

    it('throws InternalServerError on failure', async () => {
      prisma.task.delete.mockRejectedValue(new Error());
      await expect(service.remove('uid', '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
