import { z } from 'zod';
import { projectSchema } from './project.schema';
import { optionalString } from './helper/optional';
import { clientSchema } from './client.schema';

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
    isWithTime: z.boolean().optional(),
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
    isWithTime: z.boolean().optional(),
});

export const eventPayloadSchema = z.object({
    total: z.number(),
    items: z.array(
        z.object({
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
        })
    ),
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
    isWithTime: z.boolean(),
});

export type Event = z.infer<typeof eventSchema>;
export type EventPayload = z.infer<typeof eventPayloadSchema>;
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type EventFilterDto = z.infer<typeof eventFilterSchema>;
export type EditEventDto = z.infer<typeof editEventSchema>;
