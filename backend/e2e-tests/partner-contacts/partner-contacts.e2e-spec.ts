import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockCreatePartnerContactPayload } from './mock-partner-contact';
import { accessToken } from '../test-utils';

describe('PartnerContactController (e2e)', () => {
    let app: INestApplication;
    let createdPartnerContactId: string | null = null;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /partner-contacts - should create a partner contact', async () => {
        const response = await request(app.getHttpServer())
            .post('/partner-contacts')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreatePartnerContactPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreatePartnerContactPayload.name);

        createdPartnerContactId = response.body.id;
    });

    it('POST /partner-contacts/search - should find many partner contacts with filter', async () => {
        const searchPayload = {};
        const response = await request(app.getHttpServer())
            .post('/partner-contacts/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchPayload)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /partner-contacts/:id - should edit the created partner contact', async () => {
        const updatedPayload = {
            name: 'Updated Partner Contact Name', 
            email: 'updated_partner_contact@example.com'
        }; 

        const response = await request(app.getHttpServer())
            .patch(`/partner-contacts/${createdPartnerContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPayload)
            .expect(200);

        expect(response.body.id).toEqual(createdPartnerContactId);
        expect(response.body.name).toEqual(updatedPayload.name);
        expect(response.body.email).toEqual(updatedPayload.email);
    });

    it('GET /partner-contacts/:id - should return the updated partner contact', async () => {
        const getRes = await request(app.getHttpServer())
            .get(`/partner-contacts/${createdPartnerContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(getRes.body.id).toEqual(createdPartnerContactId);
        expect(getRes.body.name).toEqual('Updated Partner Contact Name');
    });

    it('DELETE /partner-contacts/:id - should delete the created partner contact', async () => {
        const deleteRes = await request(app.getHttpServer())
            .delete(`/partner-contacts/${createdPartnerContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(deleteRes.body).toHaveProperty('id');

        await request(app.getHttpServer())
            .get(`/partner-contacts/${createdPartnerContactId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});
