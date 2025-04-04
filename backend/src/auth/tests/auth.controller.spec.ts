import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { LocalAuthService, GoogleOAuthService, TokenService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const mockLocalAuthService = {
    login: jest.fn().mockResolvedValue({
      accessTokenString: 'access-token',
      refreshTokenString: 'refresh-token',
      user: { email: 'test@example.com' },
    }),
    register: jest.fn().mockResolvedValue({ message: 'Registered' }),
    resetPasswordRequest: jest.fn().mockResolvedValue({ message: 'Email sent' }),
    resetPassword: jest.fn().mockResolvedValue({ message: 'Password reset' }),
  };

  const mockTokenService = {
    refreshAccessToken: jest.fn().mockResolvedValue({
      newAccessToken: 'new-access-token',
      newRefreshToken: 'new-refresh-token',
      user: { email: 'test@example.com' },
    }),
  };

  const mockGoogleOAuthService = {
    login: jest.fn().mockResolvedValue({
      accessToken: 'access-token',
      refreshToken: { id: 'refresh-token' },
      user: { email: 'test@example.com' },
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: LocalAuthService, useValue: mockLocalAuthService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: GoogleOAuthService, useValue: mockGoogleOAuthService },
        { provide: ConfigService, useValue: { get: () => 'http://localhost:3000' } },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', password: '12345678' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Registered' });
  });

  it('/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: '12345678' });
    expect(res.status).toBe(200);
    expect(res.body.accessTokenString).toBeDefined();
    expect(res.body.user).toBeDefined();
  });

  it('/auth/refresh (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/refresh')
      .set('Cookie', ['refreshToken=refresh-token']);
    expect(res.status).toBe(200);
    expect(res.body.newAccessToken).toBeDefined();
  });

  it('/auth/reset-password-request (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/reset-password-request')
      .send({ email: 'test@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual('Email sent');
  });

  it('/auth/reset-password (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/reset-password')
      .send({ token: 'reset-token', newPassword: 'newpass123' });
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual('Password reset');
  });

  afterAll(async () => {
    await app.close();
  });
});
