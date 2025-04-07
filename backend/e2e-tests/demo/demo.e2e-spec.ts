import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { accessToken, refreshToken } from '../test-utils';
import * as cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('DemoController (e2e)', () => {
    let app: INestApplication;
    let demoUserId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    it('GET /demo - should return demo user data and access token', async () => {
        const response = await request(app.getHttpServer())
            .get('/demo')
            .expect(200);

        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('accessToken');

        demoUserId = response.body.user.id;
    });

    it('GET /demo - should return existing demo user data', async () => {
        const response = await request(app.getHttpServer())
            .get('/demo')
            .set('Cookie', `refresh_token=2769d98f-1e25-49ad-9e41-c05d3d261ef8`)
            .expect(200);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('email');
      
        if (demoUserId) {
         await prisma.user.delete({
             where: { id: demoUserId },
         });
         console.log('deleted user')
         await prisma.$disconnect();
     }
    });

    it('GET /demo/new - should return demo user data and access token', async () => {
        const response = await request(app.getHttpServer())
            .get('/demo/new')
            .expect(200);

        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('accessToken');

        demoUserId = response.body.user.id;
        console.log('id to be deleted', demoUserId)
    }, 10000);

    afterAll(async () => {
      
      console.log('cleaning up')
      
      if (demoUserId) {
            await prisma.user.delete({
                where: { id: demoUserId },
            });
            console.log('deleted user')
            await prisma.$disconnect();
        }
        await app.close();
    });
});
