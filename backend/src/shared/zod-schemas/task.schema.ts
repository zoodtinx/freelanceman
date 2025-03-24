import { z } from 'zod';

export const taskStatusEnum = z.enum(['pending', 'finished', 'cancelled']);

export const createTaskSchema = z.object({
   name: z.string().min(1),
   status: z.string().min(1),
   projectId: z.string().min(1),
   clientId: z.string().min(1),
   dueAt: z.string().datetime(),
   details: z.string().optional(),
   link: z.string().url().optional(),
});

export const searchTaskSchema = z.object({
   name: z.string().optional(),
   status: taskStatusEnum.optional(),
   dueAt: z.string().datetime().optional(),
   projectId: z.string().optional(),
   clientId: z.string().optional(),
});

export const updateTaskSchema = z.object({
   name: z.string().optional(),
   status: taskStatusEnum.optional(),
   dueAt: z.string().datetime().optional(),
   link: z.string().url().optional(),
   details: z.string().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type SearchTaskSchema = z.infer<typeof searchTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
