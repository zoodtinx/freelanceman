import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  mockCreateTask,
  mockUpdateTask,
  mockSearchTask,
} from './mockTasks';
import { accessToken } from '../test-utils';

const prisma = new PrismaClient();

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let createdTaskId: string | null = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /tasks - should create a task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockCreateTask)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(mockCreateTask.name);
    createdTaskId = res.body.id;
  });

  it('POST /tasks/search - should return task list', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks/search')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockSearchTask)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /tasks/:id - should return the created task', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.id).toBe(createdTaskId);
  });

  it('PATCH /tasks/:id - should update the task', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockUpdateTask)
      .expect(200);

    expect(res.body.name).toBe(mockUpdateTask.name);
  });

  it('DELETE /tasks/:id - should delete the task', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const check = await prisma.task.findUnique({
      where: { id: createdTaskId },
    });
    expect(check).toBeNull();
    createdTaskId = null;
  });

  afterAll(async () => {
    if (createdTaskId) {
      await prisma.task.delete({ where: { id: createdTaskId } });
      createdTaskId = null;
    }
    await prisma.$disconnect();
  });
});
