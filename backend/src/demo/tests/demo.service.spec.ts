import { Test, TestingModule } from '@nestjs/testing';
import { DemoService } from 'src/demo/demo.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { TokenService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

describe('DemoService', () => {
  let service: DemoService;
  let prisma: any;
  let jwt: any;

  const demoUser = { id: 'user-id', role: 'demo' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DemoService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            refreshToken: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: TokenService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('secret'),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('access-token'),
          },
        },
      ],
    }).compile();

    service = module.get(DemoService);
    prisma = module.get(PrismaService);
    jwt = module.get(JwtService);
  });

  describe('createDemoUser', () => {
    it('should create and return a demo user', async () => {
      prisma.user.create.mockResolvedValue(demoUser);
      const res = await service.createDemoUser();
      expect(res).toEqual(demoUser);
    });

    it('should throw on failure', async () => {
      prisma.user.create.mockRejectedValue(new Error());
      await expect(service.createDemoUser()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createRefreshToken', () => {
    it('should create and return a refresh token ID', async () => {
      prisma.refreshToken.create.mockResolvedValue({ id: 'refresh-id' });
      const res = await service.createRefreshToken(demoUser);
      expect(res).toBe('refresh-id');
    });
  });

  describe('resolveNewDemoUser', () => {
    it('returns new demo user with token', async () => {
      prisma.user.create.mockResolvedValue(demoUser);
      prisma.refreshToken.create.mockResolvedValue({ id: 'refresh-id' });
      const res = await service.resolveNewDemoUser();
      expect(res).toEqual({
        user: demoUser,
        refreshToken: 'refresh-id',
        accessToken: 'access-token',
      });
    });
  });

  describe('resolveDemoUser', () => {
    it('returns new user if no token provided', async () => {
      prisma.user.create.mockResolvedValue(demoUser);
      prisma.refreshToken.create.mockResolvedValue({ id: 'refresh-id' });
      const res = await service.resolveDemoUser();
      expect(res.user).toEqual(demoUser);
    });

    it('throws if token expired', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        userId: 'expired-user-id',
        expiresAt: new Date(Date.now() - 10000).toISOString(),
      });

      await expect(
        service.resolveDemoUser('expired-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('returns resolved user from token', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        userId: 'user-id',
        expiresAt: new Date(Date.now() + 10000),
      });

      prisma.user.findUnique.mockResolvedValue(demoUser);

      const res = await service.resolveDemoUser('valid-token');

      expect(res).toEqual({
        user: demoUser,
        refreshToken: 'valid-token',
        accessToken: 'access-token',
      });
    });

    it('throws on internal error', async () => {
      prisma.refreshToken.findUnique.mockRejectedValue(new Error());
      await expect(
        service.resolveDemoUser('some-token'),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
