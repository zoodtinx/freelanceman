import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    mockAccessTokenPayload,
    mockAccessTokenString,
    mockRefreshTokenPayload,
    mockRefreshTokenRecord,
    mockRefreshTokenRecordWithUser,
    mockUser,
} from 'src/auth/mockData';
import { ConfigService } from '@nestjs/config';

describe('LocalAuthService', () => {
    let authService: LocalAuthService;
    let jwtService: JwtService;
    let prismaService: PrismaService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LocalStrategy,
                LocalAuthService,
                ConfigService,
                JwtService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        authService = module.get<LocalAuthService>(LocalAuthService);
        jwtService = module.get<JwtService>(JwtService);
        prismaService = module.get<PrismaService>(PrismaService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(jwtService).toBeDefined();
        expect(prismaService).toBeDefined();
    });

    it('should return a user if validation succeeds', async () => {});
    it('should throw UnauthorizedException if validation fails', async () => {});

    it('should return a user, access token, refresh token if registration succeeds', async () => {});
    it('should throw ConflictException if validation fails', async () => {});
});

describe('TokenService', () => {
    let tokenService: TokenService;
    let jwtService: JwtService;
    let prismaService: PrismaService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TokenService,
                JwtService,
                ConfigService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                        },
                        refreshToken: {
                            findUnique: jest.fn(),
                            delete: jest.fn(),
                            deleteMany: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        tokenService = module.get<TokenService>(TokenService);
        jwtService = module.get<JwtService>(JwtService);
        prismaService = module.get<PrismaService>(PrismaService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(tokenService).toBeDefined();
        expect(jwtService).toBeDefined();
        expect(prismaService).toBeDefined();
    });

    //test access token
    it('should return a user if accsss token validation succeeds', async () => {
        jest.spyOn(tokenService, 'validateAccessToken').mockResolvedValue(
            mockUser,
        );
        await expect(
            tokenService.validateAccessToken(mockAccessTokenPayload),
        ).resolves.toEqual(mockUser);
    });

    it('should throw UnauthorizedException if accsss token validation fails', async () => {
        jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
        await expect(
            tokenService.validateAccessToken(mockAccessTokenPayload),
        ).rejects.toThrow(UnauthorizedException);
    });

    //test refresh token
    it('should return a user if refresh token validation succeeds', async () => {
        jest.spyOn(prismaService.refreshToken, 'findUnique').mockResolvedValue(
            mockRefreshTokenRecordWithUser,
        );
        await expect(
            tokenService.validateRefreshToken(mockRefreshTokenPayload),
        ).resolves.toEqual(mockUser);
    });

    it('should throw UnauthorizedException if refresh token validation fails', async () => {
        jest.spyOn(prismaService.refreshToken, 'findUnique').mockResolvedValue(
            null,
        );
        await expect(
            tokenService.validateRefreshToken(mockRefreshTokenPayload),
        ).rejects.toThrow(UnauthorizedException);
    });

    //test refresh acees token using refresh token
    it('should return a user, access token, refresh token if refresh access token succeeds', async () => {
        jest.spyOn(prismaService.refreshToken, 'deleteMany').mockResolvedValue({
            count: 5,
        });
        jest.spyOn(prismaService.refreshToken, 'create').mockResolvedValue(
            mockRefreshTokenRecord,
        );
        jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessTokenString);
        await expect(
            tokenService.refreshAccessToken({ user: mockUser }),
        ).resolves.toEqual({
            accessToken: mockAccessTokenString,
            refreshToken: mockAccessTokenString,
            user: mockUser,
        });
    });

    it('should throw UnauthorizedException if refresh access token fails', async () => {});
});
