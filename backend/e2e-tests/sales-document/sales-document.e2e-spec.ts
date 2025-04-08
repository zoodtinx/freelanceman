import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/shared/database/prisma.service';
import { accessToken } from '../test-utils';

describe('SalesDocumentsController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let docId: string;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get(PrismaService);
        await app.init();
    });

    const payload = {
        title: 'Invoice April 2025',
        category: 'Invoice',
        number: 'INV-0425-001',
        issuedAt: new Date().toISOString(),
        currency: 'USD',
        projectId: '088860df-8fdd-4379-a8e6-c3fb3d997003',
        referenceNumber: 'REF-2025-04',
        projectDescription: 'Website redesign for Acme Corp',
        selectedProjectClientId: '0e6e4218-7366-4e33-903b-da1f7d0d2d55',
        freelancerName: 'John Doe',
        freelancerEmail: 'john.doe@example.com',
        freelancerPhone: '+1-234-567-8900',
        freelancerTaxId: '123-45-6789',
        freelancerDetail: 'Senior freelance designer',
        clientId: '0e6e4218-7366-4e33-903b-da1f7d0d2d55',
        clientName: 'Acme Corp',
        clientTaxId: '987-65-4321',
        clientAddress: '123 Main St, Springfield, IL',
        clientPhone: '+1-987-654-3210',
        clientOffice: 'Marketing',
        clientDetail: 'Primary contact: Jane Smith',
        subtotal: 5000,
        discount: 500,
        tax: 350,
        total: 4850,
        customAdjustment: -100,
        note: 'Payment due in 30 days',
    };

    it('/sales-documents (POST) creates doc', async () => {
        const res = await request(app.getHttpServer())
            .post('/sales-documents')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(payload)
            .expect(201);

        docId = res.body.data.id;
        expect(res.body.success).toBe(true);
    });

    it('/sales-documents/search (POST) finds doc', async () => {
        const res = await request(app.getHttpServer())
            .post('/sales-documents/search')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ category: 'Invoice' })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data.some((doc) => doc.id === docId)).toBeTruthy();
    });

    it('/sales-documents/:id (GET) returns single doc', async () => {
        const res = await request(app.getHttpServer())
            .get(`/sales-documents/${docId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.data.id).toBe(docId);
    });

    it('/sales-documents/:id (PATCH) updates doc', async () => {
        const updatedTitle = 'Updated Title';
        const res = await request(app.getHttpServer())
            .patch(`/sales-documents/${docId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ title: updatedTitle })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe(updatedTitle);

        const verifyRes = await request(app.getHttpServer())
            .get(`/sales-documents/${docId}`)
            .set('Authorization', `Bearer ${accessToken}`);
        expect(verifyRes.body.success).toBe(true);
        expect(verifyRes.body.data.title).toBe(updatedTitle);
    });

    it('/sales-documents/create-pdf (POST) creates PDF and uploads', async () => {
        const res = await request(app.getHttpServer())
            .post('/sales-documents/create-pdf')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(payload)
            .expect(201);

        expect(res.body.success).toBe(true);
    });

    it('/sales-documents/:id (DELETE) deletes doc', async () => {
        await request(app.getHttpServer())
            .delete(`/sales-documents/${docId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        await request(app.getHttpServer())
            .get(`/sales-documents/${docId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });

    afterAll(async () => {
        await prisma.salesDocument.deleteMany({
            where: { title: { contains: 'Test' } },
        });
        await app.close();
    });
});
