import { optional, z } from 'zod';
import { taskPayloadSchema, taskSchema } from './task.schema';
import { optionalNumber, optionalString } from './helper/optional';
import { PrismaPayloadInterface, prismaPayloadSchema } from './helper/payload-template';

export const ProjectStatusEnum = z.enum(['active', 'on-hold', 'completed', '']);
export const PaymentStatusEnum = z.enum(['pending', 'processing', 'paid', '']);

export type ProjectStatus = 'active' | 'on-hold' | 'completed';
export type PaymentStatus = 'pending' | 'processing' | 'paid';

const linkSchema = z.object({
    label: z.string(),
    url: z.string()
})

const linkPayloadSchema = linkSchema.merge(prismaPayloadSchema);

export const projectPayloadSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
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
    tasks: z.array(taskPayloadSchema),
    links: z.array(linkPayloadSchema),
});

export const projectListPayloadSchema = z.object({
  total: z.number(),
  items: z.array(projectPayloadSchema),
});

export const projectSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
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
    name: z.string().min(1),
    clientId: optionalString(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,
    budget: z.number().nonnegative(),
});

export const editProjectSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).optional(),
    projectStatus: ProjectStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    paymentStatus: PaymentStatusEnum.optional().transform((val) =>
        val === '' ? undefined : val
    ),
    contacts: z.object({
        contactType: z.string(),
        contacts: z.array(z.string())
      }).optional(),
    workingFiles: z.array(z.string()).optional(),
    assetFiles: z.array(z.string()).optional(),
    links: z.array(linkSchema).optional().nullable(),
    note: z.string().optional(),
    clientId: optionalString(),
    budget: z.number().optional(),
    pinned: z.boolean().optional()
});

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
    take: optionalNumber()
});


export type Project = z.infer<typeof projectSchema>;
export type ProjectFilterDto = z.infer<typeof projectFilterSchema>
export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type EditProjectDto = z.infer<typeof editProjectSchema>;
export type ProjectPayload = z.infer<typeof projectPayloadSchema>;
export type ProjectListPayload = z.infer<typeof projectListPayloadSchema>;

export type ProjectLinks = z.infer<typeof linkSchema>;
export type ProjectLinksPayload = ProjectLinks & PrismaPayloadInterface;

// export interface CreateProjectDto {
//     name: string;
//     budget: number;
//     projectStatus: "" | "active" | "on-hold" | "completed";
//     paymentStatus: "" | "unpaid" | "processing" | "paid";
//     clientId?: string | null | undefined;
// }






const exampleProjectPayload = {
  id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  name: "Website Redesign for Aura Tea Co.",
  clientId: "client-aura-tea",
  budget: 15000,
  projectStatus: 'active',
  paymentStatus: 'pending',
  note: "Focus on elegant, organic aesthetics and mobile responsiveness.",
};

interface ProjectInterFace {
    name: string,
    budget: number, //in Thai baht, so add the approporaite market value
    projectStatus: 'active' | 'on-hold' | 'completed',
    paymentStatus: 'pending' | 'processing' | 'paid',
    note: string //simulate a quick reminder note, client's comment, some idea, link short or long sentence of multiple entry separate by new line 
}