import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
    mockCreateClientPayload,
    mockCreateClientPayloadWithInvalidUserId,
    mockCreateExistingClientPayload,
    mockInvalidCreateClientPayload,
} from './mocks/mock-create-client-data';
import { accessToken } from './mocks/tokens';

const prisma = new PrismaClient();

describe('ClientController POST (e2e)', () => {
    let app: INestApplication;
    let createdClientId: string | null = null;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/clients/create (POST) - should create a client', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateClientPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreateClientPayload.name);

        createdClientId = response.body.id;
    });

    it('/clients/create (POST) - should fail because of existing user id', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateExistingClientPayload)
            .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
            'A client with this unique field already exists',
        );
    });

    it('/clients/create (POST) - should fail because of invalid user id', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateClientPayloadWithInvalidUserId)
            .expect(400);

        expect(response.body).toHaveProperty('message');
        console.log(
            'mockCreateClientPayloadWithInvalidUserId message',
            response.body,
        );
    });

    it('/clients/create (POST) - should fail zod validation', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockInvalidCreateClientPayload)
            .expect(400);
    });

    afterEach(async () => {
        if (createdClientId) {
            await prisma.client.delete({
                where: { id: createdClientId },
            });
            createdClientId = null;
        }
    });
});
