import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import mockUserRecords from 'src/shared/database/mocks/mockUser';

describe('ClientController POST (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - should login a user', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'john.doe@example.com',
                password: 'password123',
            })
            .expect(200);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toEqual('john.doe@example.com');
    });

    it('/auth/login (POST) - should fail with invalid credential', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'john.doe@example.com',
                password: 'password122',
            })
            .expect(401);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Invalid email or password');
    });
});
