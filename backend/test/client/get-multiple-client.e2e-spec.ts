import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { accessToken } from './mocks/tokens';

const prisma = new PrismaClient();


describe('ClientController POST /clients/search (e2e)', () => {
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
        const response = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ hasActiveProject: true })
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('ZOODTINX Studio');
    });

    it('should return client by name filter', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ name: 'NextGen Robotics' })
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('NextGen Robotics');
    });

    it('should return all clients when no filter is provided', async () => {
        const response = await request(app.getHttpServer())
            .post('/clients/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({})
            .expect(200);
    
        expect(response.body.length).toBe(5);
    });
    

    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
        await app.close();
    });
});
