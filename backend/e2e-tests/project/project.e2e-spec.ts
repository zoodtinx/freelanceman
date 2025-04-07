import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { mockCreateProjectPayload } from './mock-project'; // Add mock data
import { accessToken } from '../test-utils';

describe('ProjectController (e2e)', () => {
    let app: INestApplication;
    let createdProjectId: string | null = null;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /projects - should create a project', async () => {
        const response = await request(app.getHttpServer())
            .post('/projects')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateProjectPayload)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toEqual(mockCreateProjectPayload.title);

        createdProjectId = response.body.id;
    });

    it('POST /projects/search - should find many projects with filter', async () => {
        const searchPayload = { title: mockCreateProjectPayload.title };
        const response = await request(app.getHttpServer())
            .post('/projects/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchPayload)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /projects/:id - should edit the created project', async () => {
        const updatedPayload = {
            title: 'Updated Project title',
            description: 'Updated Project Description',
        };

        const response = await request(app.getHttpServer())
            .patch(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPayload)
            .expect(200);

        expect(response.body.id).toEqual(createdProjectId);
        expect(response.body.title).toEqual(updatedPayload.title);
    });

    it('GET /projects/:id - should return the updated project', async () => {
        const getRes = await request(app.getHttpServer())
            .get(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(getRes.body.id).toEqual(createdProjectId);
        expect(getRes.body.title).toEqual('Updated Project title');
    });

    it('DELETE /projects/:id - should delete the created project', async () => {
        const deleteRes = await request(app.getHttpServer())
            .delete(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(deleteRes.body).toHaveProperty('success');

        await request(app.getHttpServer())
            .get(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});
