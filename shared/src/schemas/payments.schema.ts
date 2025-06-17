import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';
import { clientCoreSchema } from './clients.schema';
import {
    projectCoreSchema,
    projectFilterSchema
} from './projects.schema';

export const salesDocumentMinimalSchema = z.object({
    id: z.string().uuid(),
});
export type SalesDocumentMinimal = z.infer<typeof salesDocumentMinimalSchema>;

export const paymentFilterDtoSchema = projectFilterSchema.extend({
    paymentStatus: z
        .enum(['paid', 'due', ''])
        .optional()
        .transform((val) => (val === '' ? undefined : val)),
}).partial();
export type PaymentFilterDto = z.infer<typeof paymentFilterDtoSchema>;

export const paymentDataItemSchema = projectCoreSchema.extend({
    salesDocuments: z.array(salesDocumentMinimalSchema),
    client: clientCoreSchema.nullable(),
});
export type PaymentDataItem = z.infer<typeof paymentDataItemSchema>;

export const getPaymentDataResponseSchema = z.object({
    total: z.number(),
    items: z.array(paymentDataItemSchema),
});
export type GetPaymentDataResponse = z.infer<
    typeof getPaymentDataResponseSchema
>;

export const getPaymentStatsResponseSchema = z.object({
    unprocessed: z.number(),
    processing: z.number(),
    allAmountDue: z.number(),
});
export type GetPaymentStatsResponse = z.infer<
    typeof getPaymentStatsResponseSchema
>;
