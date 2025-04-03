import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthService } from './local-auth.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/shared/email/email.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  refreshToken: {
    upsert: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

const mockEmailService = {
  send: jest.fn(),
};

describe('LocalAuthService', () => {
  let service: LocalAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalAuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<LocalAuthService>(LocalAuthService);
  });

  it('should validate user with correct credentials', async () => {
    const email = 'test@mail.com';
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);

    mockPrismaService.user.findUnique.mockResolvedValue({
      id: 1,
      email,
      password: hashedPassword,
    });

    const result = await service.validateUser(email, password);
    expect(result).toEqual({ id: 1, email });
  });

  it('should throw on invalid credentials', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);
    await expect(service.validateUser('x', 'y')).rejects.toThrow(UnauthorizedException);
  });

  it('should register a new user', async () => {
    const dto = { email: 'test@mail.com', password: '123456' };
    mockPrismaService.user.findUnique.mockResolvedValue(null);
    mockPrismaService.user.create.mockImplementation(({ data }) => ({ ...data }));
    mockJwtService.sign.mockReturnValue('token');

    const result = await service.register(dto);
    expect(result).toHaveProperty('access_token', 'token');
    expect(result).toHaveProperty('user.email', dto.email);
  });

  it('should not register an existing user', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue({ id: 1 });
    await expect(service.register({ email: 'test@mail.com', password: '123' })).rejects.toThrow(ConflictException);
  });

  it('should login a user and return tokens', async () => {
    const req = {
      user: { id: 1, role: 'user' },
    };
    mockJwtService.sign.mockReturnValueOnce('access-token');
    mockPrismaService.refreshToken.upsert.mockResolvedValue({ id: 'refresh-id' });
    mockJwtService.sign.mockReturnValueOnce('refresh-token');

    const result = await service.login(req);
    expect(result).toEqual({
      accessTokenString: 'access-token',
      refreshTokenString: 'refresh-token',
      user: req.user,
    });
  });

  it('should handle reset password request for non-existing user', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);
    await expect(service.resetPasswordRequest({ email: 'x@mail.com' })).rejects.toThrow(UnauthorizedException);
  });

  it('should reset password for existing user', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue({ email: 'x@mail.com' });
    mockPrismaService.user.update.mockResolvedValue({});
    const result = await service.resetPassword({ email: 'x@mail.com', password: 'newpass' });
    expect(result).toEqual({ message: 'Password reset successfully' });
  });
});
