import { z } from 'zod';
import {
  nullableStringField,
  nullableUuidField,
  optionalNumberField,
  optionalStringField,
} from './helper/crudPreprocessor';

import { projectCoreSchema } from './projects.schema';
import { clientCoreSchema } from './clients.schema';

export const EventStatusEnum = z.enum(['scheduled', 'completed', '']);
export type EventStatus = 'scheduled' | 'completed';

export const eventCoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  details: nullableStringField(),
  link: nullableStringField(),
  dueAt: z.string(),
  projectId: nullableUuidField(),
  clientId: nullableUuidField(),
  userId: z.string(),
  tags: z.array(z.string()),
  isWithTime: z.boolean().optional(),
  createdAt: nullableStringField(),
  updatedAt: nullableStringField(),
});
export type EventCore = z.infer<typeof eventCoreSchema>;

export const createEventSchema = z.object({
  name: z.string().min(1),
  details: nullableStringField(),
  link: nullableStringField(),
  dueAt: z.string(),
  projectId: nullableUuidField(),
  tags: z.array(z.string()).default([]).optional(),
  isWithTime: z.boolean().optional(),
});
export type CreateEventDto = z.infer<typeof createEventSchema>;

export const editEventSchema = z.object({
    id: z.string(),
    name: optionalStringField(),
    details: nullableStringField(),
    link: nullableStringField(),
    dueAt: nullableStringField(),
    projectId: nullableUuidField(),
    clientId: nullableUuidField(),
    tags: z.array(z.string()).default([]).optional(),
    isWithTime: z.boolean(),
});
export type EditEventDto = z.infer<typeof editEventSchema>;

export const eventFilterSchema = z.object({
  name: optionalStringField(),
  status: EventStatusEnum.optional().transform((val) =>
    val === '' ? undefined : val
  ),
  dueAt: optionalStringField(),
  projectId: optionalStringField(),
  clientId: optionalStringField(),
  take: optionalNumberField(),
});
export type EventFilterDto = z.infer<typeof eventFilterSchema>;

export const createEventResponseSchema = eventCoreSchema;
export type CreateEventResponse = z.infer<typeof createEventResponseSchema>;

export const eventFindManyItemSchema = eventCoreSchema.extend({
  client: clientCoreSchema,
  project: projectCoreSchema,
});
export type EventFindManyItem = z.infer<typeof eventFindManyItemSchema>;

export const eventFindManyResponseSchema = z.object({
  items: z.array(eventFindManyItemSchema),
  total: z.number(),
  unfilteredTotal: z.number(),
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
