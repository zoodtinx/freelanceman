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

describe('ClientsController PATCH /clients/:id (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        await prisma.$executeRaw`BEGIN`;

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should update a client successfully', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/clients/${mockEditClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockEditClientPayload)
            .expect(200);

        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('userId');
        expect(res.body.name).toBe(mockEditClientPayload.name);
    });

    it('should fail zod validation', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/clients/${mockEditClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockWrongEditClientPayload)
            .expect(400);

        expect(res.body).toHaveProperty('_errors');
    });

    it('should return 400 for invalid client id', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/clients/invalid-id`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockEditClientPayload)
            .expect(400);

        expect(res.body).toHaveProperty('message');
    });

    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
        await app.close();
    });
});
