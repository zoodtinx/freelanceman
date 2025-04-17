import { z } from 'zod';
import { taskPayloadSchema } from './task.schema';

export const ProjectStatusEnum = z.enum(['active', 'on-hold', 'completed', '']);
export const PaymentStatusEnum = z.enum(['unpaid', 'processing', 'paid', '']);

export type ProjectStatus = 'active' | 'on-hold' | 'completed';
export type PaymentStatus = 'unpaid' | 'processing' | 'paid';

export const projectPayloadSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    clientId: z.string(),
    budget: z.number().int(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,
    links: z.array(z.string().url()),
    note: z.string().optional(),
    userId: z.string(),
    pinned: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
    client: z.object({
        id: z.string(),
        name: z.string(),
        themeColor: z.string(),
    }),
    tasks: z.array(taskPayloadSchema),
});

export const createProjectSchema = z.object({
    title: z.string().min(1),
    clientId: z.string().min(1),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,
    budget: z.number().nonnegative(),
});

export const editProjectSchema = z.object({
    id: z.string().uuid(),
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
    projectStatus: ProjectStatusEnum.optional().or(z.literal('')),
    paymentStatus: PaymentStatusEnum.optional().or(z.literal('')),
    pinned: z.boolean().optional(),
});

export type ProjectFilterDto = z.infer<typeof projectFilterSchema>;
export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type EditProjectDto = z.infer<typeof editProjectSchema>;
export type ProjectPayload = z.infer<typeof projectPayloadSchema>;
