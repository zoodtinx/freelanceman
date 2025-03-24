import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
    mockCreateClientPayload,
    mockCreateExistingClientPayload,
    mockInvalidCreateClientPayload,
} from './mocks/mock-create-client-data';
import { accessToken } from '../test-utils';

const prisma = new PrismaClient();

describe('ClientsController (e2e)', () => {
    let app: INestApplication;
    let createdClientId: string | null = null;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /clients - should create a client', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateClientPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreateClientPayload.name);

        createdClientId = response.body.id;
    });

    it('POST /clients - should fail due to duplicate client', async () => {
        await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateExistingClientPayload)
            .expect(400);
    });

    it('POST /clients - should fail Zod validation', async () => {
        await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockInvalidCreateClientPayload)
            .expect(400);
    });

    afterEach(async () => {
        if (createdClientId) {
            await prisma.client.delete({ where: { id: createdClientId } });
            createdClientId = null;
        }
    });
});
