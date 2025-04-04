import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from 'src/clients/clients.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const createClientMock = {
    name: 'John Doe Design Studio',
    taxId: '123456789',
    email: 'contact@johndoe.com',
    phoneNumber: '+1234567890',
    address: '123 Creative Avenue, Suite 45',
    detail: 'Full-service design agency specializing in digital media.',
    themeColor: '#FF5733',
};

const editClientMock = {
    name: 'John Doe Design Studio Updated',
    phoneNumber: '+9876543210',
    themeColor: '#00FF00',
};

const searchClientMock = {
    name: 'John',
    hasActiveProject: true,
};

describe('ClientsService', () => {
    let service: ClientsService;
    let prisma: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientsService,
                {
                    provide: PrismaService,
                    useValue: {
                        client: {
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

        service = module.get(ClientsService);
        prisma = module.get(PrismaService);
    });

    describe('create', () => {
        it('creates a client', async () => {
            prisma.client.create.mockResolvedValue({ id: '1' });
            const result = await service.create('uid', createClientMock);
            expect(result.id).toBe('1');
        });

        it('throws on unique constraint', async () => {
            prisma.client.create.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'A client with this unique field already exists',
                    {
                        code: 'P2002',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.create('uid', createClientMock),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws on other errors', async () => {
            prisma.client.create.mockRejectedValue(new Error());
            await expect(
                service.create('uid', createClientMock),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('findMany', () => {
        it('returns clients', async () => {
            prisma.client.findMany.mockResolvedValue([{ id: '1' }]);
            const result = await service.findMany('uid', {});
            expect(result).toHaveLength(1);
        });

        it('throws on error', async () => {
            prisma.client.findMany.mockRejectedValue(new Error());
            await expect(service.findMany('uid', {})).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('findOne', () => {
        it('returns a client', async () => {
            prisma.client.findUnique.mockResolvedValue({ id: '1' });
            const res = await service.findOne('uid', '1');
            expect(res.id).toBe('1');
        });

        it('throws NotFound if not found', async () => {
            prisma.client.findUnique.mockResolvedValue(null);
            await expect(service.findOne('uid', 'missing')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('throws on other errors', async () => {
            prisma.client.findUnique.mockRejectedValue(new Error());
            await expect(service.findOne('uid', '1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('update', () => {
        it('updates a client', async () => {
            prisma.client.update.mockResolvedValue({
                id: '1',
                name: 'Updated',
            });
            const result = await service.update('uid', '1', editClientMock);
            expect(result.name).toBe('Updated');
        });

        it('throws on not found', async () => {
            prisma.client.update.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'Duplicate entry error',
                    {
                        code: 'P2025',
                        clientVersion: '4.0.0',
                    },
                ),
            );
            await expect(
                service.update('uid', 'missing', { name: 'x' }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws on other errors', async () => {
            prisma.client.update.mockRejectedValue(new Error());
            await expect(
                service.update('uid', '1', { name: 'x' }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('delete', () => {
        it('deletes a client', async () => {
            prisma.client.delete.mockResolvedValue({ id: '1' });
            const result = await service.delete('uid', '1');
            expect(result.id).toBe('1');
        });

        it('throws on not found', async () => {
            prisma.client.delete.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError(
                    'Duplicate entry error',
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

        it('throws on other errors', async () => {
            prisma.client.delete.mockRejectedValue(new Error());
            await expect(service.delete('uid', '1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });
});
