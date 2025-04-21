import { z } from 'zod';

export const eventStatusEnum = z.enum(['scheduled', 'completed', 'cancelled']);

export const createEventSchema = z.object({
    name: z.string().min(1),
    status: z.string().min(1),
    projectId: z.string().min(1),
    clientId: z.string().min(1).optional(),
    dueAt: z.string().datetime(),
    details: z.string().optional(),
    link: z.string().url().optional(),
});

export const eventFilterSchema = z.object({
    name: z.string().optional(),
    status: eventStatusEnum.optional(),
    dueAt: z.string().datetime().optional(),
    projectId: z.string().optional(),
    clientId: z.string().optional(),
});

export const editEventSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    status: eventStatusEnum.optional(),
    dueAt: z.string().datetime().optional(),
    link: z.string().url().optional(),
    details: z.string().optional(),
});

export const eventPayloadSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    status: z.string().min(1),
    details: z.string().optional(),
    link: z.string().optional(),
    dueAt: z.string(),
    projectId: z.string(),
    clientId: z.string(),
    userId: z.string(),
    tags: z.array(z.string()).min(1),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
});

export type EventPayload = z.infer<typeof eventPayloadSchema>;
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type EventFilterDto = z.infer<typeof eventFilterSchema>;
export type EditEventDto = z.infer<typeof editEventSchema>;
