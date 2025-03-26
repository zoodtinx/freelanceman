import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { resetDatabase } from '../test-utils';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await resetDatabase();
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

    it('/auth/register (POST) - should not allow duplicate user', async () => {
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email: 'duplicate@example.com',
                password: 'password123',
                displayName: 'Duplicate User',
            })
            .expect(201);

        const response = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email: 'duplicate@example.com',
                password: 'password123',
                displayName: 'Duplicate User',
            })
            .expect(409);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
            'User with this email already exist',
        );
    });

    it('/auth/register (POST) - should fail with invalid payload', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email: 'invalid-email',
                password: '',
            })
            .expect(400);

        expect(typeof response.body).toBe('object');
        expect(response.body).toMatchObject({
            email: { _errors: ['Invalid email format'] },
            password: {
                _errors: ['Password must be at least 8 characters long'],
            },
        });
    });
});
