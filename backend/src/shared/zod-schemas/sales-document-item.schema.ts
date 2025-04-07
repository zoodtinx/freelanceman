import { z } from 'zod';

export const createSalesDocumentItemSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    rate: z.number(),
    quantity: z.number().int(),
    salesDocumentId: z.string(),
});

export const updateSalesDocumentItemSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    rate: z.number().optional(),
    quantity: z.number().int().optional(),
});

export type CreateSalesDocumentItemDto = z.infer<
    typeof createSalesDocumentItemSchema
>;

export type UpdateSalesDocumentItemDto = z.infer<
    typeof updateSalesDocumentItemSchema
>;
