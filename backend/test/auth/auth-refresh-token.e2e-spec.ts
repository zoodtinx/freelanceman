import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockAccessToken, mockInvalidAccessToken } from './mocks/mockAuthData';
import * as cookieParser from 'cookie-parser';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    it('/auth/refresh (GET) - should validate a user and set new refresh token in cookies', async () => {
        const response = await request(app.getHttpServer())
            .get('/auth/refresh')
            .set('Cookie', 'refreshToken=ec8e5b2c-b02c-42d7-b0fc-61b24dd85f02')
            .expect(200);

        expect(response.body).toHaveProperty('newAccessToken');
        expect(response.body).toHaveProperty('user');

        const setCookieHeader = response.headers['set-cookie'];
        expect(setCookieHeader).toBeDefined();

        const cookies = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];
        expect(
            cookies.some((cookie) => cookie.startsWith('refreshToken=')),
        ).toBe(true);
    });

    it('/auth/refresh (POST) - should fail with expired or invalid token', async () => {
        const response = await request(app.getHttpServer())
            .get('/auth/refresh')
            .set('Cookie', 'refreshToken=bd13dc6d-2292-4ea6-9cc4-a71d381abf03')
            .expect(401);

        expect(response.body).toHaveProperty('message');
    });
});



