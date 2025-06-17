import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';

import { projectCoreSchema } from './projects.schema';
import { clientCoreSchema } from './clients.schema';


export const EventStatusEnum = z.enum(['scheduled', 'completed', '']);
export type EventStatus = 'scheduled' | 'completed';

export const eventCoreSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    details: optionalString().optional(),
    link: optionalString().optional(),
    dueAt: z.date(),
    projectId: optionalString(),
    clientId: optionalString(),
    userId: z.string().uuid(),
    tags: z.array(z.string()),
    isWithTime: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type EventCore = z.infer<typeof eventCoreSchema>;

export const createEventSchema = z.object({
    name: z.string().min(1),
    details: optionalString().optional(),
    link: optionalString().optional(),
    dueAt: z.date(),
    projectId: optionalString(),
    tags: z.array(z.string()).default([]),
    isWithTime: z.boolean().optional(),
});
export type CreateEventDto = z.infer<typeof createEventSchema>;

export const editEventSchema = z.object({
    name: z.string().min(1).optional(),
    details: optionalString().optional(),
    link: optionalString().optional(),
    dueAt: z.date().optional(),
    projectId: optionalString(),
    clientId: optionalString(),
    tags: z.array(z.string()).optional(),
    isWithTime: z.boolean().optional(),
});
export type EditEventDto = z.infer<typeof editEventSchema>;

export const eventFilterSchema = z.object({
    name: optionalString(),
    status: EventStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    dueAt: z.date().optional(),
    projectId: optionalString(),
    clientId: optionalString(),
    take: optionalNumber(),
});
export type EventFilterDto = z.infer<typeof eventFilterSchema>;

export const createEventResponseSchema = eventCoreSchema;
export type CreateEventResponse = z.infer<typeof createEventResponseSchema>;

export const eventFindManyItemSchema = eventCoreSchema.extend({
    client: z.lazy(() => clientCoreSchema).nullable(),
    project: z.lazy(() => projectCoreSchema).nullable(),
});
export type EventFindManyItem = z.infer<typeof eventFindManyItemSchema>;

export const eventFindManyResponseSchema = z.object({
    items: z.array(eventFindManyItemSchema),
    total: z.number(),
});
export type EventFindManyResponse = z.infer<typeof eventFindManyResponseSchema>;

export const eventFindOneResponseSchema = eventCoreSchema;
export type EventFindOneResponse = z.infer<typeof eventFindOneResponseSchema>;

export const updateEventResponseSchema = eventCoreSchema;
export type UpdateEventResponse = z.infer<typeof updateEventResponseSchema>;

export const removeEventResponseSchema = z.object({
    success: z.boolean(),
});
export type RemoveEventResponse = z.infer<typeof removeEventResponseSchema>;
