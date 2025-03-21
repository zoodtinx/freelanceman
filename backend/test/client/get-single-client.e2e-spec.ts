import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { accessToken } from './mocks/tokens';
import { mockGetClientId, mockWrongGetClientId } from './mocks/mock-get-single-client-data';

const prisma = new PrismaClient();

describe('ClientController GET :id (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        await prisma.$executeRaw`BEGIN`;

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/clients/:id (GET) - should retrieve a client', async () => {
        const response = await request(app.getHttpServer())
            .get(`/clients/${mockGetClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('userId');
        expect(response.body).toHaveProperty('name');
    });

    it('/clients/:id (GET) - should fail to retrieve a client', async () => {
        const response = await request(app.getHttpServer())
        .get(`/clients/${mockWrongGetClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)    
            .expect(404);

        expect(response.body).toHaveProperty('message');
    });

    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
        await app.close();
    });
});