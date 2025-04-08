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

    it('/auth/reset-password-request (POST) - should reset password', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/reset-password-request')
            .send({ email: 'jane.doe@example.com' })
            .expect(200);

        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBe(true);
    });
    
    it('/auth/reset-password (POST) - should reset password', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/reset-password')
            .send({ email: 'jane.doe@example.com', password: 'zoodtinx' })
            .expect(200);

        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBe(true);
    });


});
