import { Test, TestingModule } from '@nestjs/testing';
import { ClientContactService } from 'src/client-contacts/client-contacts.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('ClientContactService', () => {
    let service: ClientContactService;
    let prisma: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientContactService,
                {
                    provide: PrismaService,
                    useValue: {
                        clientContact: {
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

        service = module.get(ClientContactService);
        prisma = module.get(PrismaService);
    });

    describe('create', () => {
        it('creates contact', async () => {
            prisma.clientContact.create.mockResolvedValue({ id: '1' });
            const res = await service.create('user-id', {
                name: 'Test',
                companyId: 'company-id',
                role: 'Manager',
                phoneNumber: '1234',
                email: 'a@b.com',
                detail: 'info',
                avatar: '',
            });
            expect(res.id).toBe('1');
        });

        it('throws BadRequest if duplicate', async () => {
            prisma.clientContact.create.mockRejectedValue(
                new Prisma.PrismaClientKnownRequestError('Duplicate entry error', {
                    code: 'P2002',
                    clientVersion: '4.0.0',
                    meta: {
                      target: ['email'], 
                    },
                  })
            );
            await expect(
                service.create('uid', {
                    name: 'Test',
                    companyId: 'cid',
                    role: '',
                    phoneNumber: '',
                    email: '',
                    detail: '',
                    avatar: '',
                }),
            ).rejects.toThrow(BadRequestException);
        });

        it('throws on other error', async () => {
            prisma.clientContact.create.mockRejectedValue(new Error());
            await expect(
                service.create('uid', {
                    name: '',
                    companyId: '',
                    role: '',
                    phoneNumber: '',
                    email: '',
                    detail: '',
                    avatar: '',
                }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('findAll', () => {
        it('returns results', async () => {
            prisma.clientContact.findMany.mockResolvedValue([{ id: '1' }]);
            const res = await service.findAll('uid', {});
            expect(res).toHaveLength(1);
        });

        it('throws on error', async () => {
            prisma.clientContact.findMany.mockRejectedValue(new Error());
            await expect(service.findAll('uid', {})).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('findOne', () => {
        it('returns contact if found', async () => {
            prisma.clientContact.findUnique.mockResolvedValue({ id: '1' });
            const res = await service.findOne('uid', '1');
            expect(res.id).toBe('1');
        });

        it('throws NotFound if not found', async () => {
            prisma.clientContact.findUnique.mockResolvedValue(null);
            await expect(service.findOne('uid', 'not-exist')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('throws on other errors', async () => {
            prisma.clientContact.findUnique.mockRejectedValue(new Error());
            await expect(service.findOne('uid', '1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });

    describe('update', () => {
        it('updates and returns contact', async () => {
            prisma.clientContact.update.mockResolvedValue({});
            prisma.clientContact.findUnique.mockResolvedValue({ id: '1' });
            const res = await service.update('uid', '1', {
                name: 'New Name',
                email: 'x@y.com',
            });
            expect(res.id).toBe('1');
        });

        it('throws on error', async () => {
            prisma.clientContact.update.mockRejectedValue(new Error());
            await expect(
                service.update('uid', '1', { name: '', email: '' }),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('remove', () => {
        it('deletes contact', async () => {
            prisma.clientContact.delete.mockResolvedValue({});
            const res = await service.remove('uid', '1');
            expect(res).toEqual({ success: true });
        });

        it('throws on error', async () => {
            prisma.clientContact.delete.mockRejectedValue(new Error());
            await expect(service.remove('uid', '1')).rejects.toThrow(
                InternalServerErrorException,
            );
        });
    });
});
