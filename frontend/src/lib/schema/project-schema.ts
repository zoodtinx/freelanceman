import { z } from 'zod';

export const projectStatusEnum = z.enum(['active', 'on-hold', 'completed']);
export const paymentStatusEnum = z.enum(['unpaid', 'processing', 'paid']);

export const projectSchema = z.object({
   id: z.string().uuid(),
   title: z.string(),
   clientId: z.string(),
   budget: z.number().int(),
   projectStatus: projectStatusEnum,
   paymentStatus: paymentStatusEnum,
   links: z.array(z.string().url()),
   note: z.string().optional(),
   userId: z.string(),
   pinned: z.boolean().default(false),
   createdAt: z.date(),
   updatedAt: z.date(),
});

export const createProjectSchema = z.object({
   title: z.string().min(1),
   clientId: z.string().min(1),
   projectStatus: projectStatusEnum,
   paymentStatus: paymentStatusEnum,
   budget: z.number().nonnegative(),
});

export const updateProjectSchema = z.object({
   title: z.string().min(1).optional(),
   projectStatus: z.enum(['active', 'completed', 'on-hold']).optional(),
   paymentStatus: z.enum(['unpaid', 'paid', 'processing']).optional(),
   contacts: z.array(z.string()).optional(),
   workingFiles: z.array(z.string()).optional(),
   assetFiles: z.array(z.string()).optional(),
   links: z.array(z.string()).optional(),
   note: z.string().optional(),
});

export const projectFilterSchema = z.object({
   title: z.string().optional(),
   projectId: z.string().optional(),
   clientId: z.string().optional(),
   contactId: z.string().optional(),
   partnerId: z.string().optional(),
   eventId: z.string().optional(),
   taskId: z.string().optional(),
   projectStatus: projectStatusEnum,
   paymentStatus: paymentStatusEnum,
   pinned: z.boolean().optional(),
});

export type SearchProjectDto = z.infer<typeof projectFilterSchema>;

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export type ProjectPayload = z.infer<typeof projectSchema>;
