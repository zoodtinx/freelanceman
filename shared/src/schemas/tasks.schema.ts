import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';
import { projectCoreSchema } from './projects.schema';
import { clientCoreSchema } from './clients.schema';

export const TaskStatusEnum = z.enum([
    'pending',
    'in-progress',
    'completed',
    '',
]);
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export const taskCoreSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    status: TaskStatusEnum,
    details: optionalString().optional(),
    link: optionalString().optional(),
    dueAt:z.string(),
    projectId: optionalString(),
    clientId: optionalString(),
    userId: z.string().uuid(),
    isWithTime: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
});
export type TaskCore = z.infer<typeof taskCoreSchema>;

export const createTaskSchema = z.object({
    name: z.string().min(1),
    status: TaskStatusEnum,
    details: optionalString().optional(),
    link: optionalString().optional(),
    dueAt:z.string(),
    projectId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    isWithTime: z.boolean().optional(),
    client: z.lazy(() => clientCoreSchema).optional().nullable(),
});
export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export const editTaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    status: TaskStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    details: optionalString().optional(),
    link: optionalString().optional(),
    dueAt:optionalString(),
    projectId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    isWithTime: z.boolean().optional(),
});
export type EditTaskDto = z.infer<typeof editTaskSchema>;

export const taskFilterSchema = z.object({
    name: optionalString(),
    status: TaskStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    dueAt:optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
    take: optionalNumber(),
});
export type TaskFilterDto = z.infer<typeof taskFilterSchema>;

export const createTaskResponseSchema = taskCoreSchema;
export type CreateTaskResponse = z.infer<typeof createTaskResponseSchema>;

export const taskFindManyItemSchema = taskCoreSchema.extend({
    client: z.lazy(() => clientCoreSchema).nullable(),
    project: z.lazy(() => projectCoreSchema).nullable(),
});
export type TaskFindManyItem = z.infer<typeof taskFindManyItemSchema>;

export const taskFindManyResponseSchema = z.object({
    items: z.array(taskFindManyItemSchema),
    total: z.number(),
});
export type TaskFindManyResponse = z.infer<typeof taskFindManyResponseSchema>;

export const taskFindOneResponseSchema = taskCoreSchema;
export type TaskFindOneResponse = z.infer<typeof taskFindOneResponseSchema>;

export const updateTaskResponseSchema = taskCoreSchema;
export type UpdateTaskResponse = z.infer<typeof updateTaskResponseSchema>;

export const removeTaskResponseSchema = z.object({
    success: z.boolean(),
});
export type RemoveTaskResponse = z.infer<typeof removeTaskResponseSchema>;
