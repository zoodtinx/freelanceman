import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
    mockAccessTokenString,
    mockRefreshTokenString,
    mockMinimalUserData,
    mockUser,
} from 'src/auth/mockData';
import { Response } from 'express';
import { User } from '@prisma/client';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: LocalAuthService;
    let tokenService: TokenService;
    let jwtService: JwtService;
    let prismaService: PrismaService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                LocalAuthService,
                TokenService,
                ConfigService,
                JwtService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
                {
                    provide: LocalAuthService,
                    useValue: {
                        login: jest.fn(),
                        register: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                        verify: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<LocalAuthService>(LocalAuthService);
        tokenService = module.get<TokenService>(TokenService);
        jwtService = module.get<JwtService>(JwtService);
        prismaService = module.get<PrismaService>(PrismaService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return a respons object with cookie and body containing access token and user data', async () => {
        const mockReq = {
            cookies: {
                refreshToken: '1234'
            }
        } as any;
        const mockRes = {
            cookie: jest.fn(),
            json: jest.fn(),
        } as unknown as Response;

        const mockRefreshTokenData = {
            accessToken: '1234',
            refreshToken: '1234',
            user: mockUser,
        };

        jest.spyOn(tokenService, 'validateRefreshToken').mockResolvedValue(mockMinimalUserData  as User);
        jest.spyOn(tokenService, 'refreshAccessToken').mockResolvedValue({
            newAccessToken: '1234',
            newRefreshToken: '1234',
            user: mockUser
        });

        await controller.refreshAccessToken(mockReq, mockRes);
        
        expect(mockRes.cookie).toHaveBeenCalledWith(
            'refreshToken',
            mockRefreshTokenData.refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            },
        );

        expect(mockRes.json).toHaveBeenCalledWith({
            newAccessToken: mockRefreshTokenData.accessToken,
            user: mockRefreshTokenData.user,
        });
    });
});
