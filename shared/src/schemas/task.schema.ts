import { z } from 'zod';
import { projectSchema } from './project.schema';
import { clientSchema } from './client.schema';

export const taskStatusEnum = z.enum(['pending', 'finished', 'cancelled']);

export const createTaskSchema = z.object({
   name: z.string().min(1),
   status: z.string().min(1),
   projectId: z.string().min(1),
   clientId: z.string().min(1).optional(),
   dueAt: z.string().datetime(),
   details: z.string().optional(),
   link: z.string().optional(),
});

export const taskFilterSchema = z.object({
   name: z.string().optional(),
   status: taskStatusEnum.optional(),
   dueAt: z.string().datetime().optional(),
   projectId: z.string().optional(),
   clientId: z.string().optional(),
});

export const editTaskSchema = z.object({
   id: z.string().uuid(),
   name: z.string().optional(),
   status: taskStatusEnum.optional(),
   dueAt: z.string().datetime().optional(),
   link: z.string().optional(),
   details: z.string().optional(),
});

export const taskPayloadSchema = z.object({
   id: z.string().uuid(),
   name: z.string().min(1),
   status: z.string().min(1),
   details: z.string().optional(),
   link: z.string().optional(),
   dueAt: z.string(),
   projectId: z.string(),
   clientId: z.string(),
   userId: z.string(),
   createdAt: z.string(),
   updatedAt: z.string().optional(),
   project: projectSchema,
   client: clientSchema
});

export const taskSchema = z.object({
   id: z.string().uuid(),
   name: z.string().min(1),
   status: z.string().min(1),
   details: z.string().optional(),
   link: z.string().optional(),
   dueAt: z.string(),
   projectId: z.string(),
   clientId: z.string(),
   userId: z.string(),
   createdAt: z.string(),
   updatedAt: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskPayload = z.infer<typeof taskPayloadSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type TaskFilterDto = z.infer<typeof taskFilterSchema>;
export type EditTaskDto = z.infer<typeof editTaskSchema>;
export type TaskStatus = z.infer<typeof taskStatusEnum>;
