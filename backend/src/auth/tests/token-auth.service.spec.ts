import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from 'src/auth/auth.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

const mockAccessToken = {
    sub: '1234567890',
    iat: 1678901234,
    exp: 1678904834,
    role: 'admin',
};

describe('TokenService', () => {
    let service: TokenService;
    let prisma: any;
    let jwt: any;
    let config: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TokenService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: { findUnique: jest.fn() },
                        refreshToken: {
                            findUnique: jest.fn(),
                            delete: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('access-token'),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('access-secret'),
                    },
                },
            ],
        }).compile();

        service = module.get(TokenService);
        prisma = module.get(PrismaService);
        jwt = module.get(JwtService);
        config = module.get(ConfigService);
    });

    describe('validateAccessToken', () => {
        it('throws if user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(
                service.validateAccessToken(mockAccessToken),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('returns user if found', async () => {
            const user = { id: 1 };
            prisma.user.findUnique.mockResolvedValue(user);
            await expect(
                service.validateAccessToken(mockAccessToken),
            ).resolves.toEqual(user);
        });
    });

    describe('validateRefreshToken', () => {
        it('throws if token not found', async () => {
            prisma.refreshToken.findUnique.mockResolvedValue(null);
            await expect(
                service.validateRefreshToken(mockAccessToken),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('throws if token expired', async () => {
            const expiredToken = {
                expiresAt: new Date(Date.now() - 1000),
                id: 1,
            };
            prisma.refreshToken.findUnique.mockResolvedValue(expiredToken);
            prisma.refreshToken.delete.mockResolvedValue({});
            await expect(
                service.validateRefreshToken(mockAccessToken),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('returns user if token valid', async () => {
            const user = { id: 1 };
            prisma.refreshToken.findUnique.mockResolvedValue({
                expiresAt: new Date(Date.now() + 1000),
                user,
            });
            await expect(
                service.validateRefreshToken(mockAccessToken),
            ).resolves.toEqual(user);
        });
    });

    describe('refreshAccessToken', () => {
        it('throws if token not found', async () => {
            prisma.refreshToken.findUnique.mockResolvedValue(null);
            await expect(service.refreshAccessToken('1')).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('throws if token expired', async () => {
            prisma.refreshToken.findUnique.mockResolvedValue({
                id: 1,
                expiresAt: new Date(Date.now() - 1000),
                user: { id: 1 },
            });
            await expect(service.refreshAccessToken('1')).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('returns new access/refresh token if valid', async () => {
            const user = { id: 1, role: 'user' };
            prisma.refreshToken.findUnique.mockResolvedValue({
                id: 1,
                expiresAt: new Date(Date.now() + 1000),
                user,
            });
            prisma.refreshToken.delete.mockResolvedValue({});
            prisma.refreshToken.create.mockResolvedValue({ id: 2 });

            const result = await service.refreshAccessToken('1');
            expect(result).toEqual({
                newAccessToken: 'access-token',
                newRefreshToken: 2,
                user,
            });
        });
    });
});
