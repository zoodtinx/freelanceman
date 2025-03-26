import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { accessToken } from '../test-utils';

const prisma = new PrismaClient();

describe('ClientsController POST /clients/search (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        await prisma.$executeRaw`BEGIN`;

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should return clients with active projects when hasActiveProject is true', async () => {
        const res = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ hasActiveProject: true })
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('projects');
        expect(res.body[0].projects.length).toBeGreaterThan(0);
    });

    it('should return clients filtered by name', async () => {
        const res = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ name: 'NextGen Robotics' })
            .expect(200);

        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('NextGen Robotics');
    });

    it('should return all clients when no filters are provided', async () => {
        const res = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({})
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
        await app.close();
    });
});
