import { z } from 'zod';
import {
    PaymentStatusEnum,
    ProjectStatusEnum,
    salesDocumentPayloadSchema,
} from './index';

export const paymentDataPayloadSchema = z.object({
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
    createdAt: z.string(),
    updatedAt: z.string(),
    salesDocuments: salesDocumentPayloadSchema,
});

export const paymentDataFilterSchema = z.object({
    clientId: z.string().optional(),
});

export type PaymentDataPayload = z.infer<typeof paymentDataPayloadSchema>;
export type PaymentDataFilter = z.infer<typeof paymentDataFilterSchema>;
