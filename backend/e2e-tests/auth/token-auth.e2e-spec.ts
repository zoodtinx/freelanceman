import * as cookieParser from 'cookie-parser';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockAccessToken, mockInvalidAccessToken } from './mocks/mockAuthData';
import { accessToken } from '../test-utils';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/check (POST) - should validate a user', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/check')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(201);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toEqual({ email: 'zoodtinx@gmail.com' });
    });

    it('/auth/refresh (GET) - should validate a user and set new refresh token in cookies', async () => {
        const response = await request(app.getHttpServer())
            .get('/auth/refresh')
            .set('Cookie', 'refreshToken=357e13af-9b2f-4b99-9d7a-9d492145519c')
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
});
