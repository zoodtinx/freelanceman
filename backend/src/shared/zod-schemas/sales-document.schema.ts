import { z } from 'zod';

export const createSalesDocumentSchema = z.object({
    title: z.string().min(1),
    category: z.string().min(1),
    number: z.string().min(1),
    issuedAt: z.string().datetime(),
    currency: z.string().min(1),
    projectId: z.string().uuid(),
    referenceNumber: z.string().min(1),
    projectDescription: z.string().min(1),
    selectedProjectClientId: z.string().uuid(),
    freelancerName: z.string().min(1),
    freelancerEmail: z.string().email(),
    freelancerPhone: z.string().min(1),
    freelancerTaxId: z.string().min(1),
    freelancerDetail: z.string().optional(),
    clientId: z.string(),
    clientName: z.string().min(1),
    clientTaxId: z.string().min(1),
    clientAddress: z.string().optional(),
    clientPhone: z.string().optional(),
    clientOffice: z.string().optional(),
    clientDetail: z.string().optional(),
    subtotal: z.number(),
    discount: z.number().optional(),
    tax: z.number(),
    total: z.number(),
    customAdjustment: z.number().optional(),
    note: z.string().optional(),
});

export const searchSalesDocumentSchema = z.object({
    title: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    projectId: z.string().uuid().optional(),
    selectedProjectClientId: z.string().uuid().optional(),
});

export const updateSalesDocumentSchema = z.object({
    title: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    number: z.string().min(1).optional(),
    issuedAt: z.string().datetime().optional(),
    currency: z.string().min(1).optional(),
    projectId: z.string().uuid().optional(),
    referenceNumber: z.string().min(1).optional(),
    projectDescription: z.string().min(1).optional(),
    selectedProjectClientId: z.string().uuid().optional(),
    freelancerName: z.string().min(1).optional(),
    freelancerEmail: z.string().email().optional(),
    freelancerPhone: z.string().min(1).optional(),
    freelancerTaxId: z.string().min(1).optional(),
    freelancerDetail: z.string().optional(),
    clientId: z.string().uuid().optional(),
    clientName: z.string().min(1).optional(),
    clientTaxId: z.string().min(1).optional(),
    clientAddress: z.string().optional(),
    clientPhone: z.string().optional(),
    clientOffice: z.string().optional(),
    clientDetail: z.string().optional(),
    subtotal: z.number().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    total: z.number().optional(),
    customAdjustment: z.number().optional(),
    note: z.string().optional(),
});

export type SearchSalesDocumentDto = z.infer<typeof searchSalesDocumentSchema>;
export type UpdateSalesDocumentDto = z.infer<typeof updateSalesDocumentSchema>;
export type CreateSalesDocumentDto = z.infer<typeof createSalesDocumentSchema>;
