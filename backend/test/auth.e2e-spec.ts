import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/register (POST) - should register a new user', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
                displayName: 'Test User',
            })
            .expect(201);

        expect(response.body).toHaveProperty('access_token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toEqual({ email: 'test@example.com' });
    });
});
