import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { accessToken } from '../test-utils';

const clientId = 'cd7646ec-75c5-413f-ac5c-c47d4f28b554';
const wrongId = '00000000-0000-0000-0000-000000000000';

const clientData = {
    id: clientId,
    name: 'Creative Minds Studio',
    taxId: '321-654-987',
    email: 'info@creativeminds.com',
    phoneNumber: '+66 2214 5678',
    address: '789 Art Avenue, Phuket',
    detail: 'Graphic design and branding agency.',
    userId: '2769d98f-1e25-49ad-9e41-c05d3d261ef4',
    themeColor: '#a832a8',
};

describe('ClientsController DELETE (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('DELETE /clients/:id - should delete the client', async () => {
        await request(app.getHttpServer())
            .delete(`/clients/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);
    });

    it('DELETE /clients/:id - should return 400 for non-existent client', async () => {
        const res = await request(app.getHttpServer())
            .delete(`/clients/${wrongId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(400);

        expect(res.body.message).toContain(
            `Client with ID ${wrongId} not found`,
        );
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .post('/clients')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(clientData)
            .expect(201);

        await app.close();
    });
});
