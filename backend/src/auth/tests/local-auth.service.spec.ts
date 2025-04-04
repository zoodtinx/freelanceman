import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/shared/email/email.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

describe('LocalAuthService', () => {
    let service: LocalAuthService;
    let prisma: any;
    let jwt: any;
    let config: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LocalAuthService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                        },
                        refreshToken: {
                            upsert: jest.fn(),
                        },
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('token'),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('secret'),
                    },
                },
                {
                    provide: EmailService,
                    useValue: {
                        sendResetPassword: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get(LocalAuthService);
        prisma = module.get(PrismaService);
        jwt = module.get(JwtService);
        config = module.get(ConfigService);
    });

    describe('validateUser', () => {
        it('throws if user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(
                service.validateUser('a@a.com', '123'),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('throws if password mismatch', async () => {
            prisma.user.findUnique.mockResolvedValue({ password: 'hashed' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            await expect(
                service.validateUser('a@a.com', '123'),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('returns user on success', async () => {
            prisma.user.findUnique.mockResolvedValue({
                id: 1,
                email: 'a@a.com',
                password: 'hashed',
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            const res = await service.validateUser('a@a.com', '123');
            expect(res).toEqual({ id: 1, email: 'a@a.com' });
        });
    });

    describe('register', () => {
        it('throws if user exists', async () => {
            prisma.user.findUnique.mockResolvedValue(true);
            await expect(
                service.register({
                    email: 'a@a.com',
                    password: '123456',
                    displayName: 'a',
                }),
            ).rejects.toThrow(ConflictException);
        });

        it('registers new user', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            prisma.user.create.mockResolvedValue({ email: 'a@a.com' });
            const result = await service.register({
                email: 'a@a.com',
                password: '123456',
                displayName: 'a',
            });
            jest.spyOn(jwt, 'sign').mockReturnValue('token');
            expect(result).toEqual({
                accessToken: 'token',
                user: { email: 'a@a.com' },
            });
        });
    });

    describe('login', () => {
        it('returns tokens and user', async () => {
            prisma.refreshToken.upsert.mockResolvedValue({ id: 123 });
            const req = {
                user: {
                    id: 1,
                    role: 'user',
                    email: 'a@a.com',
                },
            };
            const result = await service.login(req);
            expect(result).toEqual({
                accessTokenString: 'token',
                refreshTokenString: 'token',
                user: req.user,
            });
        });
    });

    describe('resetPasswordRequest', () => {
        it('throws if user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(
                service.resetPasswordRequest({ email: 'notfound@x.com' }),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('succeeds silently if user exists', async () => {
            prisma.user.findUnique.mockResolvedValue({ id: 1 });
            await expect(
                service.resetPasswordRequest({ email: 'a@a.com' }),
            ).resolves.not.toThrow();
        });
    });

    describe('resetPassword', () => {
        it('throws if user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(
                service.resetPassword({ email: 'no@x.com', password: '123' }),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('updates password if user exists', async () => {
            prisma.user.findUnique.mockResolvedValue({ id: 1 });
            prisma.user.update.mockResolvedValue({});
            await expect(
                service.resetPassword({ email: 'a@a.com', password: '123' }),
            ).resolves.toEqual({
                message: 'Password reset successfully',
            });
        });
    });
});
