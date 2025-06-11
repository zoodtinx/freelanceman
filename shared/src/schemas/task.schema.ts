import { z } from 'zod';
import { projectSchema } from './project.schema';
import { clientSchema } from './client.schema';
import { optionalNumber, optionalString } from './helper/optional';

export const taskStatusEnum = z.enum(['pending', 'finished', 'cancelled']);

export const createTaskSchema = z.object({
    name: z.string().min(1),
    status: z.string().min(1),
    projectId: optionalString(),
    dueAt: z.string().datetime(),
    details: optionalString(),
    link: optionalString(),
    isWithTime: z.boolean().optional(),
});

export const taskFilterSchema = z.object({
    name: optionalString(),
    status: optionalString(),
    dueAt: optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
    take: optionalNumber(),
});

export const editTaskSchema = z.object({
    id: z.string().uuid(),
    name: optionalString(),
    status: optionalString(),
    dueAt: optionalString(),
    link: optionalString(),
    details: optionalString(),
    isWithTime: z.boolean().optional(),
});

export const taskPayloadSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    status: z.string().min(1),
    details: optionalString(),
    link: optionalString(),
    dueAt: z.string(),
    projectId: z.string(),
    clientId: z.string(),
    userId: z.string(),
    tags: z.array(z.string()).min(1),
    createdAt: z.string(),
    updatedAt: optionalString(),
    project: projectSchema,
    client: clientSchema,
    isWithTime: z.boolean(),
});

export const taskListPayloadSchema = z.object({
    total: z.number(),
    items: z.array(taskPayloadSchema),
});

export const taskSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    status: z.string().min(1),
    details: optionalString(),
    link: optionalString(),
    dueAt: z.string(),
    projectId: z.string(),
    clientId: z.string(),
    userId: z.string(),
    createdAt: z.string(),
    updatedAt: optionalString(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskPayload = z.infer<typeof taskPayloadSchema>;
export type TaskListPayload = z.infer<typeof taskListPayloadSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type TaskFilterDto = z.infer<typeof taskFilterSchema>;
export type EditTaskDto = z.infer<typeof editTaskSchema>;
export type TaskStatus = z.infer<typeof taskStatusEnum>;



export interface CreateTask {
    name: string;
    status: 'pending' | 'completed',
    dueAt: string; //use relative date like new Date to iso string with time with z, like if it's pending, add a date time that is greater than today (1-14 days). if completed, add date in the past, majority of the task are pending, completed comes second then inprogress and cancelled
    details?: string;
    link?: string; //can be skipped
    isWithTime?: boolean; //if dueAt is not 00000 in time section, make this true
}
