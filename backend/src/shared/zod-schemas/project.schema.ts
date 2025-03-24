import { z } from 'zod';

export const createProjectSchema = z.object({
    title: z.string().min(1),
    clientId: z.string().min(1),
    projectStatus: z.enum(['active', 'completed', 'on-hold']),
    paymentStatus: z.enum(['unpaid', 'paid', 'processing']),
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

export const searchProjectSchema = z.object({
    title: z.string().optional(),
    projectId: z.string().optional(),
    clientId: z.string().optional(),
    contactId: z.string().optional(),
    partnerId: z.string().optional(),
    eventId: z.string().optional(),
    taskId: z.string().optional(),
    paymentStatus: z.string().optional(),
    projectStatus: z.string().optional(),
    pinned: z.boolean().optional(),
});


export type SearchProjectDto = z.infer<typeof searchProjectSchema>;

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
