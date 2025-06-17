import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';
import { clientCoreSchema } from './clients.schema';
import { taskCoreSchema } from './tasks.schema';
import { clientContactCoreSchema } from './client-contacts.schema';

export const ProjectStatusEnum = z.enum(['active', 'on-hold', 'completed', '']);
export const PaymentStatusEnum = z.enum(['pending', 'processing', 'paid', '']);

export type ProjectStatus = 'active' | 'on-hold' | 'completed';
export type PaymentStatus = 'pending' | 'processing' | 'paid';

const linkSchema = z.object({
    label: z.string(),
    url: z.string(),
});
export type ProjectLink = z.infer<typeof linkSchema>;

export const projectCoreSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    clientId: z.string().uuid().nullable(),
    budget: z.number().int(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,
    note: optionalString().optional(),
    userId: z.string().uuid(),
    pinned: z.boolean(),
    createdAt: z.string(),
   updatedAt: z.string(),
});
export type ProjectCore = z.infer<typeof projectCoreSchema>;

export const createProjectSchema = z.object({
    name: z.string().min(1),
    clientId: optionalString(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,
    budget: z.number().int().nonnegative(),
});
export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export const editProjectSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).optional(),
    projectStatus: ProjectStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    paymentStatus: PaymentStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),

    contacts: z
        .object({
            contactType: z.enum(['client', 'partner']),
            contacts: z.array(z.string().uuid()),
        })
        .optional(),

    workingFiles: z.array(z.string().uuid()).optional(),
    assetFiles: z.array(z.string().uuid()).optional(),
    links: z.array(linkSchema).optional().nullable(),
    note: optionalString().optional(),
    clientId: optionalString().optional(),
    budget: z.number().int().nonnegative().optional(),
    pinned: z.boolean().optional(),
});
export type EditProjectDto = z.infer<typeof editProjectSchema>;

export const projectFilterSchema = z.object({
    name: optionalString(),
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
    take: optionalNumber(),
});
export type ProjectFilterDto = z.infer<typeof projectFilterSchema>;

export const createProjectResponseSchema = projectCoreSchema;
export type CreateProjectResponse = z.infer<typeof createProjectResponseSchema>;

export const projectSelectionSchema = z.object({
    label: z.string(),
    value: z.string().uuid(),

    client: z
        .object({
            themeColor: z.string(),
        })
        .optional(),
});
export type ProjectSelection = z.infer<typeof projectSelectionSchema>;
export const projectSelectionsListSchema = z.array(projectSelectionSchema);
export type ProjectSelectionsList = z.infer<typeof projectSelectionsListSchema>;

export const projectFindManyItemSchema = projectCoreSchema.extend({
    client: clientCoreSchema,
    tasks: z.array(taskCoreSchema),
});
export type ProjectFindManyItem = z.infer<typeof projectFindManyItemSchema>;

export const projectFindManyResponseSchema = z.object({
    items: z.array(projectFindManyItemSchema),
    total: z.number(),
    unfilteredTotal: z.number(),
});
export type ProjectFindManyResponse = z.infer<
    typeof projectFindManyResponseSchema
>;

export const projectFindOneResponseSchema = projectCoreSchema.extend({
    client: clientCoreSchema,
    links: z.array(linkSchema),
    tasks: z.array(taskCoreSchema),
    clientContacts: z.array(
        z.object({
            clientContact: clientContactCoreSchema,
        })
    ),
});
export type ProjectFindOneResponse = z.infer<
    typeof projectFindOneResponseSchema
>;

export const updateProjectResponseSchema = projectCoreSchema;
export type UpdateProjectResponse = z.infer<typeof updateProjectResponseSchema>;

export const removeProjectResponseSchema = z.object({
    success: z.boolean(),
});
export type RemoveProjectResponse = z.infer<typeof removeProjectResponseSchema>;
