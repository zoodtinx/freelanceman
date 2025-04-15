import { z } from 'zod';
import {
    paymentStatusEnum,
    projectStatusEnum,
    salesDocumentPayloadSchema,
} from './index';

export const paymentDataPayloadSchema = z.object({
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
    salesDocuments: salesDocumentPayloadSchema,
});

export const paymentDataFilterSchema = z.object({
    clientId: z.string().optional(),
});

export type PaymentDataPayload = z.infer<typeof paymentDataPayloadSchema>;
export type PaymentDataFilter = z.infer<typeof paymentDataFilterSchema>;
