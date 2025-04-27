import { z } from 'zod';
import {
    clientPayloadSchema,
    filePayloadSchema,
    PaymentStatusEnum,
    ProjectStatusEnum,
    salesDocumentPayloadSchema,
    userPayloadSchema,
} from './index';
import { optionalString } from './helper/optional';

export const paymentDataPayloadSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    clientId: z.string(),
    budget: z.number().int(),
    projectStatus: ProjectStatusEnum,
    paymentStatus: PaymentStatusEnum,
    links: z.array(z.string().url()),
    note: optionalString(),
    userId: z.string(),
    pinned: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    salesDocuments: z.array(salesDocumentPayloadSchema),
    files: z.array(filePayloadSchema),
    client: clientPayloadSchema,
});

export const paymentDataFilterSchema = z.object({
    clientId: optionalString(),
});

export type PaymentDataPayload = z.infer<typeof paymentDataPayloadSchema>;
export type PaymentDataFilter = z.infer<typeof paymentDataFilterSchema>;
