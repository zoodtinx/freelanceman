import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { accessToken } from './mocks/tokens';
import {
    mockEditClientId,
    mockEditClientPayload,
    mockWrongEditClientPayload,
} from './mocks/mock-edit-client-data';

const prisma = new PrismaClient();

describe('ClientController PATCH :id (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        await prisma.$executeRaw`BEGIN`;

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/clients/:id (PATCH) - should edit a client', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/clients/${mockEditClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockEditClientPayload)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('userId');
        expect(response.body).toHaveProperty('name');
    });

    it('/clients/:id (PATCH) - should fail validation', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/clients/${mockEditClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockWrongEditClientPayload)
            .expect(400);

        expect(response.body).toHaveProperty('_errors');
    });

    it('/clients/:id (PATCH) - should fail because of wrong client id', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/clients/${mockWrongEditClientPayload}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockEditClientPayload)
            .expect(400);

        expect(response.body).toHaveProperty('message');
    });
    
    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
        await app.close();
    });
});
