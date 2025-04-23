import { z } from 'zod';
import { projectSchema } from './project.schema';
import { optionalString } from './helper/optional';

export const eventStatusEnum = z.enum(['scheduled', 'completed', 'cancelled']);

export type EventStatus = 'scheduled' | 'completed' | 'cancelled';

export const createEventSchema = z.object({
    name: z.string().min(1),
    status: z.string().min(1),
    projectId: z.string().min(1),
    clientId: optionalString(),
    dueAt: z.string().datetime(),
    details: optionalString(),
    link: optionalString(),
});

export const eventFilterSchema = z.object({
    name: optionalString(),
    status: optionalString(),
    dueAt: optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
});

export const editEventSchema = z.object({
    id: z.string().uuid(),
    name: optionalString(),
    status: optionalString(),
    dueAt: optionalString(),
    link: optionalString(),
    details: optionalString(),
});

export const eventPayloadSchema = z.object({
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
});

export const eventSchema = z.object({
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
});

export type Event = z.infer<typeof eventSchema>;
export type EventPayload = z.infer<typeof eventPayloadSchema>;
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type EventFilterDto = z.infer<typeof eventFilterSchema>;
export type EditEventDto = z.infer<typeof editEventSchema>;
