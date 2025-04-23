import { z } from 'zod';
import { projectSchema } from './project.schema';
import { clientSchema } from './client.schema';
import { optionalString } from './helper/optional';

export const taskStatusEnum = z.enum(['pending', 'finished', 'cancelled']);

export const createTaskSchema = z.object({
   name: z.string().min(1),
   status: z.string().min(1),
   projectId: z.string().min(1),
   clientId:optionalString(),
   dueAt: z.string().datetime(),
   details:optionalString(),
   link:optionalString(),
});

export const taskFilterSchema = z.object({
   name:optionalString(),
   status:optionalString(),
   dueAt:optionalString(),
   projectId:optionalString(),
   clientId:optionalString(),
});

export const editTaskSchema = z.object({
   id: z.string().uuid(),
   name:optionalString(),
   status:optionalString(),
   dueAt:optionalString(),
   link:optionalString(),
   details:optionalString(),
});

export const taskPayloadSchema = z.object({
   id: z.string().uuid(),
   name: z.string().min(1),
   status: z.string().min(1),
   details:optionalString(),
   link:optionalString(),
   dueAt: z.string(),
   projectId: z.string(),
   clientId: z.string(),
   userId: z.string(),
   createdAt: z.string(),
   updatedAt:optionalString(),
   project: projectSchema,
   client: clientSchema
});

export const taskSchema = z.object({
   id: z.string().uuid(),
   name: z.string().min(1),
   status: z.string().min(1),
   details:optionalString(),
   link:optionalString(),
   dueAt: z.string(),
   projectId: z.string(),
   clientId: z.string(),
   userId: z.string(),
   createdAt: z.string(),
   updatedAt:optionalString(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskPayload = z.infer<typeof taskPayloadSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type TaskFilterDto = z.infer<typeof taskFilterSchema>;
export type EditTaskDto = z.infer<typeof editTaskSchema>;
export type TaskStatus = z.infer<typeof taskStatusEnum>;
