import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
    mockCreateProjectPayload,
    mockInvalidCreateProjectPayload,
    mockSearchProjectPayload,
} from './mocks/mockCreateProjectPayload';
import { accessToken } from './mocks/tokens';

const prisma = new PrismaClient();

describe('ProjectsController (e2e)', () => {
    let app: INestApplication;
    let createdProjectId: string | null = null;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /projects - should create a project', async () => {
        const res = await request(app.getHttpServer())
            .post('/projects')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockCreateProjectPayload)
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual(mockCreateProjectPayload.title);
        createdProjectId = res.body.id;
        console.log('createdProjectId', createdProjectId)
    });

    it('POST /projects - should fail validation', async () => {
        await request(app.getHttpServer())
            .post('/projects')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockInvalidCreateProjectPayload)
            .expect(400);
    });

    it('POST /projects/search - should return list of projects', async () => {
        const res = await request(app.getHttpServer())
            .post('/projects/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(mockSearchProjectPayload)
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /projects/:id - should return the created project', async () => {
        const res = await request(app.getHttpServer())
            .get(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(res.body.id).toBe(createdProjectId);
    });

    it('PATCH /projects/:id - should update the project', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ title: 'Updated Title' })
            .expect(200);

        expect(res.body.title).toBe('Updated Title');
    });

    it('DELETE /projects/:id - should delete the project', async () => {
        await request(app.getHttpServer())
            .delete(`/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        // Ensure it's deleted
        const check = await prisma.project.findUnique({
            where: { id: createdProjectId },
        });
        expect(check).toBeNull();

        createdProjectId = null;
    });

    afterAll(async () => {
        if (createdProjectId) {
            await prisma.project.delete({ where: { id: createdProjectId } });
            createdProjectId = null;
        }
    });
});
