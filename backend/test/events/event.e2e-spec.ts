import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  mockCreateEvent,
  mockUpdateEvent,
  mockSearchEvent,
} from './mockEvents';
import { accessToken } from '../test-utils';

const prisma = new PrismaClient();

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let createdEventId: string | null = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /events - should create an event', async () => {
    const res = await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockCreateEvent)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(mockCreateEvent.name);
    createdEventId = res.body.id;
  });

  it('POST /events/search - should return event list', async () => {
    const res = await request(app.getHttpServer())
      .post('/events/search')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockSearchEvent)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /events/:id - should return the created event', async () => {
    const res = await request(app.getHttpServer())
      .get(`/events/${createdEventId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.id).toBe(createdEventId);
  });

  it('PATCH /events/:id - should update the event', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/events/${createdEventId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockUpdateEvent)
      .expect(200);

    expect(res.body.name).toBe(mockUpdateEvent.name);
  });

  it('DELETE /events/:id - should delete the event', async () => {
    await request(app.getHttpServer())
      .delete(`/events/${createdEventId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const check = await prisma.event.findUnique({
      where: { id: createdEventId },
    });
    expect(check).toBeNull();
    createdEventId = null;
  });

  afterAll(async () => {
    if (createdEventId) {
      await prisma.event.delete({ where: { id: createdEventId } });
    }
    await prisma.$disconnect();
  });
});
