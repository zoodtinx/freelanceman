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
            .set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2lkX2hlcmUiLCJpYXQiOjE3NDI0NzU5OTAsImV4cCI6MTc0MjU2MjM5MCwicm9sZSI6InVzZXIifQ.1DTReAfQk5sp-rEws55-d2sd_AC-6Fe2jbRf1CnG3F8`,
            )
            .send(mockCreateClientPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreateClientPayload.name);

        createdClientId = response.body.id;
    });

    it('/clients/create (POST) - should return bad request', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2lkX2hlcmUiLCJpYXQiOjE3NDI0NzU5OTAsImV4cCI6MTc0MjU2MjM5MCwicm9sZSI6InVzZXIifQ.1DTReAfQk5sp-rEws55-d2sd_AC-6Fe2jbRf1CnG3F8`,
            )
            .send(mockCreateExistingClientPayload)
            .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('A client with this unique field already exists');
    });
    
    it('/clients/create (POST) - should return invalid user id', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2lkX2hlcmUiLCJpYXQiOjE3NDI0NzU5OTAsImV4cCI6MTc0MjU2MjM5MCwicm9sZSI6InVzZXIifQ.1DTReAfQk5sp-rEws55-d2sd_AC-6Fe2jbRf1CnG3F8`,
            )
            .send(mockCreateClientPayloadWithInvalidUserId)
            .expect(400);

        expect(response.body).toHaveProperty('message');
        console.log('mockCreateClientPayloadWithInvalidUserId message', response.body)
    });
    
    it('/clients/create (POST) - should fail zod validation', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer YOUR_TOKEN_HERE`)
            .send(mockInvalidCreateClientPayload)
            .expect(401);
    
        expect(response.body).toHaveProperty('message');
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
