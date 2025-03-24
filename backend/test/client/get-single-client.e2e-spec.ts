import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { accessToken } from './mocks/tokens';
import { mockGetClientId, mockWrongGetClientId } from './mocks/mock-get-single-client-data';

const prisma = new PrismaClient();

describe('ClientsController GET /clients/:id (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        await prisma.$executeRaw`BEGIN`;

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should retrieve a client by id', async () => {
        const res = await request(app.getHttpServer())
            .get(`/clients/${mockGetClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(res.body).toHaveProperty('id', mockGetClientId);
        expect(res.body).toHaveProperty('userId');
        expect(res.body).toHaveProperty('name');
    });

    it('should return 404 if client not found', async () => {
        const res = await request(app.getHttpServer())
            .get(`/clients/${mockWrongGetClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);

        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toContain(`Client with ID ${mockWrongGetClientId} not found`);
    });

    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
        await app.close();
    });
});
