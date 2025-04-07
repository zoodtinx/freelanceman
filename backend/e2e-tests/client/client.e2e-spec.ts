import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
    mockCreateClientPayload,
} from './mocks/mock-create-client-data';
import { accessToken } from '../test-utils';

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

    it('POST /clients/search - should find many clients with filter', async () => {
        const searchPayload = { };
        const response = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchPayload)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /clients/:id - should edit the created client', async () => {
        const updatedPayload = {
            name: 'Updated Client Name', 
            email: 'updated_email@example.com'
        }; 

        const response = await request(app.getHttpServer())
            .patch(`/clients/${createdClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPayload)
            .expect(200);

        expect(response.body.id).toEqual(createdClientId);
        expect(response.body.name).toEqual(updatedPayload.name);
        expect(response.body.email).toEqual(updatedPayload.email);
    });

    it('GET /clients/:id - should return the updated client', async () => {
        const getRes = await request(app.getHttpServer())
            .get(`/clients/${createdClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(getRes.body.id).toEqual(createdClientId);
        expect(getRes.body.name).toEqual('Updated Client Name');
    });

    it('DELETE /clients/:id - should delete the created client', async () => {
        const deleteRes = await request(app.getHttpServer())
            .delete(`/clients/${createdClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(deleteRes.body).toHaveProperty('id');

        await request(app.getHttpServer())
            .get(`/clients/${createdClientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});