import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockCreateClientContactPayload } from './mock-client-contact';
import { accessToken } from '../test-utils';

describe('ClientContactController (e2e)', () => {
    let app: INestApplication;
    let createdContactId: string | null = null;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /client-contacts - should create a client contact', async () => {
        const response = await request(app.getHttpServer())
            .post('/client-contacts')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateClientContactPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreateClientContactPayload.name);

        createdContactId = response.body.id;
    });

    it('POST /client-contacts/search - should find many client contacts with filter', async () => {
        const searchPayload = {};
        const response = await request(app.getHttpServer())
            .post('/client-contacts/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchPayload)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /client-contacts/:id - should edit the created client contact', async () => {
        const updatedPayload = {
            name: 'Updated Contact Name', 
            email: 'updated_contact@example.com'
        }; 

        const response = await request(app.getHttpServer())
            .patch(`/client-contacts/${createdContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPayload)
            .expect(200);

        expect(response.body.id).toEqual(createdContactId);
        expect(response.body.name).toEqual(updatedPayload.name);
        expect(response.body.email).toEqual(updatedPayload.email);
    });

    it('GET /client-contacts/:id - should return the updated client contact', async () => {
        const getRes = await request(app.getHttpServer())
            .get(`/client-contacts/${createdContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(getRes.body.id).toEqual(createdContactId);
        expect(getRes.body.name).toEqual('Updated Contact Name');
    });

    it('DELETE /client-contacts/:id - should delete the created client contact', async () => {
        const deleteRes = await request(app.getHttpServer())
            .delete(`/client-contacts/${createdContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(deleteRes.body).toHaveProperty('id');

        await request(app.getHttpServer())
            .get(`/client-contacts/${createdContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});
