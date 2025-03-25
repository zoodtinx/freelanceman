import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockAccessToken, mockInvalidAccessToken } from './mocks/mockAuthData';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/check (POST) - should validate a user', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/check')
            .set('Authorization', `Bearer ${mockAccessToken}`)
            .expect(201);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toEqual({email: 'zoodtinx@gmail.com'});
    });

    it('/auth/check (POST) - should fail with expired or invalid token', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/check')
            .set('Authorization', `Bearer ${mockInvalidAccessToken}`)
            .expect(401);

        expect(response.body).toHaveProperty('message');
    });
});
