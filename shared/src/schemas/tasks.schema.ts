import { z } from 'zod';
import {
    nullableStringField,
    nullableUuidField,
} from './helper/crudPreprocessor';
import { projectCoreSchema } from './projects.schema';
import { clientCoreSchema } from './clients.schema';
import {
    optionalNumberField,
    optionalStringField,
} from './helper/filterPreprocessor';

export const TaskStatusEnum = z.enum([
    'pending',
    'in-progress',
    'completed',
    '',
]);
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export const taskCoreSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: TaskStatusEnum,
    details: nullableStringField(),
    link: nullableStringField(),
    dueAt: z.string(),
    projectId: nullableStringField(),
    clientId: nullableStringField(),
    userId: z.string(),
    isWithTime: z.boolean().optional(),
    createdAt: nullableStringField(),
    updatedAt: nullableStringField(),
});
export type TaskCore = z.infer<typeof taskCoreSchema>;

export const createTaskSchema = z.object({
    name: z.string().min(1),
    status: TaskStatusEnum,
    details: nullableStringField(),
    link: nullableStringField(),
    dueAt: z.string(),
    projectId: nullableUuidField(),
    clientId: nullableUuidField(),
    isWithTime: z.boolean().optional(),
    client: z
        .lazy(() => clientCoreSchema)
        .optional()
        .nullable(),
});
export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export const editTaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    status: TaskStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    details: nullableStringField(),
    link: nullableStringField(),
    dueAt: optionalStringField(),
    isWithTime: z.boolean().optional(),
});
export type EditTaskDto = z.infer<typeof editTaskSchema>;

export const taskFilterSchema = z.object({
    name: optionalStringField(),
    status: TaskStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    dueAt: optionalStringField(),
    projectId: optionalStringField(),
    clientId: optionalStringField(),
    take: optionalNumberField(),
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
