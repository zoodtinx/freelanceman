import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from 'src/projects/projects.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('ProjectsService', () => {
    let service: ProjectsService;
    let prisma: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsService,
                {
                    provide: PrismaService,
                    useValue: {
                        project: {
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

        service = module.get(ProjectsService);
        prisma = module.get(PrismaService);
    });

    describe('create', () => {
        it('creates a project', async () => {
            prisma.project.create.mockResolvedValue({ id: '1' });
            const result = await service.create('uid', {
                title: 'New Project',
            });
            expect(result.id).toBe('1');
        });

        it('throws BadRequest on duplicate', async () => {
            prisma.project.create.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2002',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.create('uid', { title: 'New Project' }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws InternalServerError on error', async () => {
            prisma.project.create.mockRejectedValue(new Error());
            await expect(
                service.create('uid', { title: 'New Project' }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('findMany', () => {
        it('returns projects', async () => {
            prisma.project.findMany.mockResolvedValue([{ id: '1' }]);
            const result = await service.findMany('uid', {});
            expect(result).toHaveLength(1);
        });

        it('throws InternalServerError on error', async () => {
            prisma.project.findMany.mockRejectedValue(new Error());
            await expect(service.findMany('uid', {})).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('findOne', () => {
        it('returns a project', async () => {
            prisma.project.findUnique.mockResolvedValue({ id: '1' });
            const result = await service.findOne('uid', '1');
            expect(result.id).toBe('1');
        });

        it('throws NotFoundException if not found', async () => {
            prisma.project.findUnique.mockResolvedValue(null);
            await expect(service.findOne('uid', 'not-found')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('throws InternalServerError on error', async () => {
            prisma.project.findUnique.mockRejectedValue(new Error());
            await expect(service.findOne('uid', '1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('update', () => {
        it('updates a project', async () => {
            prisma.project.update.mockResolvedValue({
                id: '1',
                title: 'Updated',
            });
            const result = await service.update('uid', '1', {
                title: 'Updated',
            });
            expect(result.title).toBe('Updated');
        });

        it('throws BadRequest if project not found', async () => {
            prisma.project.update.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.update('uid', 'not-found', { title: 'x' }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws InternalServerError on error', async () => {
            prisma.project.update.mockRejectedValue(new Error());
            await expect(
                service.update('uid', '1', { title: 'x' }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('remove', () => {
        it('removes a project', async () => {
            prisma.project.delete.mockResolvedValue({ id: '1' });
            const result = await service.remove('uid', '1');
            expect(result.id).toBe('1');
        });

        it('throws BadRequest if project not found', async () => {
            prisma.project.delete.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(service.remove('uid', 'not-found')).rejects.toThrow(
                BadRequestException,
            );
        });

        it('throws InternalServerError on error', async () => {
            prisma.project.delete.mockRejectedValue(new Error());
            await expect(service.remove('uid', '1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });
});
