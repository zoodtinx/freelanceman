import { Test, TestingModule } from '@nestjs/testing';
import { GoogleOAuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';

describe('GoogleOAuthService', () => {
  let service: GoogleOAuthService;
  let prisma: any;
  let jwt: any;
  let config: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleOAuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            refreshToken: {
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

    service = module.get(GoogleOAuthService);
    prisma = module.get(PrismaService);
    jwt = module.get(JwtService);
    config = module.get(ConfigService);
  });

  it('logs in existing user', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@example.com' });
    prisma.refreshToken.create.mockResolvedValue({ id: 1 });

    const res = await service.login({
      email: 'test@example.com',
      name: 'Test User',
      picture: 'avatar.png',
    });

    expect(res).toEqual({
      accessToken: 'access-token',
      refreshToken: { id: 1 },
      user: { id: 1, email: 'test@example.com' },
    });
  });

  it('creates new user if not exists', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: 2, email: 'new@example.com' });
    prisma.refreshToken.create.mockResolvedValue({ id: 99 });

    const res = await service.login({
      email: 'new@example.com',
      name: 'New User',
      picture: 'avatar.jpg',
    });

    expect(res.user.email).toBe('new@example.com');
    expect(res.refreshToken.id).toBe(99);
  });

  it('throws error on failure', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error());
    await expect(
      service.login({ email: '', name: '', picture: '' }),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
