import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockCreateTaskPayload } from './mock-task'; // Add mock data
import { accessToken } from '../test-utils';

describe('TaskController (e2e)', () => {
    let app: INestApplication;
    let createdTaskId: string | null = null;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /tasks - should create a task', async () => {
        const response = await request(app.getHttpServer())
            .post('/tasks')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateTaskPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(mockCreateTaskPayload.name);

        createdTaskId = response.body.id;
    });

    it('POST /tasks/search - should find many tasks with filter', async () => {
        const searchPayload = { projectId: mockCreateTaskPayload.projectId };
        const response = await request(app.getHttpServer())
            .post('/tasks/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchPayload)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /tasks/:id - should edit the created task', async () => {
        const updatedPayload = {
            name: 'Updated Task Name',
            dueAt: '2025-04-07T10:00:00Z',
        };

        const response = await request(app.getHttpServer())
            .patch(`/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPayload)
            .expect(200);

        expect(response.body.id).toEqual(createdTaskId);
        expect(response.body.name).toEqual(updatedPayload.name);
    });

    it('GET /tasks/:id - should return the updated task', async () => {
        const getRes = await request(app.getHttpServer())
            .get(`/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(getRes.body.id).toEqual(createdTaskId);
        expect(getRes.body.name).toEqual('Updated Task Name');
    });

    it('DELETE /tasks/:id - should delete the created task', async () => {
        const deleteRes = await request(app.getHttpServer())
            .delete(`/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(deleteRes.body).toHaveProperty('success');

        await request(app.getHttpServer())
            .get(`/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});
