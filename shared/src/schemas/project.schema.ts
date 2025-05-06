import { optional, z } from 'zod';
import { taskPayloadSchema, taskSchema } from './task.schema';
import { optionalString } from './helper/optional';
import { PrismaPayloadInterface, prismaPayloadSchema } from './helper/payload-template';

export const ProjectStatusEnum = z.enum(['active', 'on-hold', 'completed', '']);
export const PaymentStatusEnum = z.enum(['unpaid', 'processing', 'paid', '']);

export type ProjectStatus = 'active' | 'on-hold' | 'completed';
export type PaymentStatus = 'unpaid' | 'processing' | 'paid';

const linkSchema = z.object({
    label: z.string(),
    url: z.string()
})

const linkPayloadSchema = linkSchema.merge(prismaPayloadSchema);

export const projectPayloadSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    clientId: z.string(),
    budget: z.number().int(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,

    note: optionalString(),
    userId: z.string(),
    pinned: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    client: z.object({
        id: z.string(),
        name: z.string(),
        themeColor: z.string(),
    }),
    tasks: z.array(taskSchema),
    links: z.array(linkPayloadSchema)
});

export const projectSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    clientId: z.string(),
    budget: z.number().int(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,

    note: optionalString(),
    userId: z.string(),
    pinned: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    links: z.array(linkSchema)
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
    projectStatus: ProjectStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    paymentStatus: PaymentStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    contacts: z.array(z.string()).optional(),
    workingFiles: z.array(z.string()).optional(),
    assetFiles: z.array(z.string()).optional(),
    links: z.array(linkSchema).optional().nullable(),
    note: optionalString(),
    budget: z.number().optional(),
});

export const projectFilterSchema = z.object({
    title: optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
    contactId: optionalString(),
    partnerId: optionalString(),
    eventId: optionalString(),
    taskId: optionalString(),
    projectStatus: ProjectStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    paymentStatus: PaymentStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    pinned: z.boolean().optional(),
});


export type Project = z.infer<typeof projectSchema>;
export type ProjectFilterDto = z.infer<typeof projectFilterSchema>;
export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type EditProjectDto = z.infer<typeof editProjectSchema>;
export type ProjectPayload = z.infer<typeof projectPayloadSchema>;

export type ProjectLinks = z.infer<typeof linkSchema>;
export type ProjectLinksPayload = ProjectLinks & PrismaPayloadInterface;