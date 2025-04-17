import { z } from 'zod';

export const createSalesDocumentItemSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    rate: z.number(),
    quantity: z.number().int(),
    parentDocumentId: z.string(),
});

export const editSalesDocumentItemSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    rate: z.number().optional(),
    quantity: z.number().int().optional(),
});

export type CreateSalesDocumentItemDto = z.infer<
    typeof createSalesDocumentItemSchema
>;

export type EditSalesDocumentItemDto = z.infer<
    typeof editSalesDocumentItemSchema
>;
