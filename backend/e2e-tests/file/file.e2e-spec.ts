import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { accessToken, refreshToken } from '../test-utils';
import * as cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import mockUserRecords from 'src/shared/database/mocks/mockUser';

const prisma = new PrismaClient();

describe('FileController (e2e)', () => {
    let app: INestApplication;
    let demoUserId: string;
    let demoFileId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();

        // Create a demo user and file for testing
        const user = await prisma.user.create({
            data: mockUserRecords[2],
        });
        demoUserId = user.id;

        const file = await prisma.file.create({
            data: {
                originalName: 'test-file.txt',
                displayName: 'Test File',
                type: 'text',
                category: 'document',
                link: 'https://example.com/test-file',
                size: 1000,
                s3Key: '1234',
                userId: demoUserId,
            },
        });

        demoFileId = file.id;
    });

    afterAll(async () => {
        await prisma.file.deleteMany({ where: { userId: demoUserId } });
        await prisma.user.delete({ where: { id: demoUserId } });

        await app.close();
    });

    it('should create a new file', async () => {
        const createFileDto = {
            originalName: 'example-file.pdf',
            displayName: 'Example File',
            type: 'application/pdf',
            category: 'Documents',
            link: 'https://example.com/file/12345',
            s3Key: 'uploads/example-file.pdf',
            projectId: '088860df-8fdd-4379-a8e6-c3fb3d997003',
            clientId: '0e6e4218-7366-4e33-903b-da1f7d0d2d55',
            userId: 'a64c2e4f-6afd-4a28-963f-ce9b5dcdd8e9',
            size: 2048,
        };

        const response = await request(app.getHttpServer())
            .post('/files')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(createFileDto)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.originalName).toBe('example-file.pdf');

        demoFileId = response.body.id;
    });

    it('should return a presigned URL', async () => {
        const getPresignedUrlDto = {
            fileName: 'new-file.txt',
            category: 'document',
            contentType: 'text/plain',
        };

        const response = await request(app.getHttpServer())
            .post('/files/presign')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(getPresignedUrlDto)
            .expect(200);

        expect(response.body).toHaveProperty('presignedUrl');
    });

    it('should find files', async () => {
        const searchFileDto = {
            category: 'image',
        };

        const response = await request(app.getHttpServer())
            .post('/files/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(searchFileDto)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('id');
    });

    it('should return a file by ID', async () => {
        const response = await request(app.getHttpServer())
            .get(`/files/${demoFileId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', demoFileId);
        expect(response.body.originalName).toBe('example-file.pdf');
    });

    it('should update a file', async () => {
        const updateFileDto = {
            displayName: 'Updated File',
            category: 'document',
            id: '1234',
        };

        const response = await request(app.getHttpServer())
            .patch(`/files/${demoFileId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updateFileDto)
            .expect(200);

        expect(response.body).toHaveProperty('displayName', 'Updated File');
    });

    it('should delete a file', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/files/${demoFileId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', demoFileId);
    });

    it('should return 404 for non-existing file', async () => {
        const invalidFileId = 'non-existing-id';

        await request(app.getHttpServer())
            .get(`/files/${invalidFileId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });
});
