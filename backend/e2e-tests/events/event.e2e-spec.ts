import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockCreateEventPayload } from './mock-event'; // Add mock data
import { accessToken } from '../test-utils';

describe('EventController (e2e)', () => {
    let app: INestApplication;
    let createdEventId: string | null = null;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /events - should create an event', async () => {
        const response = await request(app.getHttpServer())
            .post('/events')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateEventPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreateEventPayload.name);

        createdEventId = response.body.id;
    });

    it('POST /events/search - should find many events with filter', async () => {
        const searchPayload = { projectId: mockCreateEventPayload.projectId };
        const response = await request(app.getHttpServer())
            .post('/events/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchPayload)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /events/:id - should edit the created event', async () => {
        const updatedPayload = {
            name: 'Updated Event Name',
            dueAt: '2025-04-07T10:00:00Z', 
        };

        const response = await request(app.getHttpServer())
            .patch(`/events/${createdEventId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPayload)
            .expect(200);

        expect(response.body.id).toEqual(createdEventId);
        expect(response.body.name).toEqual(updatedPayload.name);
    });

    it('GET /events/:id - should return the updated event', async () => {
        const getRes = await request(app.getHttpServer())
            .get(`/events/${createdEventId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(getRes.body.id).toEqual(createdEventId);
        expect(getRes.body.name).toEqual('Updated Event Name');
    });

    it('DELETE /events/:id - should delete the created event', async () => {
        const deleteRes = await request(app.getHttpServer())
            .delete(`/events/${createdEventId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(deleteRes.body).toHaveProperty('success');

        await request(app.getHttpServer())
            .get(`/events/${createdEventId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});
