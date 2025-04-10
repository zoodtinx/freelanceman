import { z } from 'zod';

export const eventStatusEnum = z.enum(['scheduled', 'completed', 'cancelled']);

export const createEventSchema = z.object({
  name: z.string().min(1),
  status: z.string().min(1),
  projectId: z.string().min(1),
  clientId: z.string().min(1),
  dueAt: z.string().datetime(),
  details: z.string().optional(),
  link: z.string().url().optional(),
});

export const searchEventSchema = z.object({
  name: z.string().optional(),
  status: eventStatusEnum.optional(),
  dueAt: z.string().datetime().optional(),
  projectId: z.string().optional(),
  clientId: z.string().optional(),
});

export const updateEventSchema = z.object({
  name: z.string().optional(),
  status: eventStatusEnum.optional(),
  dueAt: z.string().datetime().optional(),
  link: z.string().url().optional(),
  details: z.string().optional(),
});

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type SearchEventDto = z.infer<typeof searchEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
