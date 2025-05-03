import { z } from 'zod';
import { optionalString } from './helper/optional';
import { filePayloadSchema } from './file.schema';
import { createSalesDocumentItemSchema, nestedCreateSalesDocumentItemSchema, salesDocumentItemSchema } from './sales-document-item.schema';

export const createSalesDocumentSchema = z.object({
    category: z.string(),
    issuedAt: z.string(),
    projectId: z.string(),
    freelancerName: z.string().min(1),
    clientId: z.string(),
    clientName: z.string().min(1),
    items: z.array(nestedCreateSalesDocumentItemSchema).min(1),

    title: optionalString(),
    number: optionalString(),
    currency: optionalString(),
    referenceNumber: optionalString(),
    projectDescription: optionalString(),

    freelancerEmail: optionalString(),
    freelancerPhone: optionalString(),
    freelancerTaxId: optionalString(),
    freelancerAddress: optionalString(),

    clientTaxId: optionalString(),
    clientAddress: optionalString(),
    clientPhone: optionalString(),
    clientOffice: optionalString(),
    clientDetail: optionalString(),

    tax: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),

    note: optionalString(),
});

export const salesDocumentFilterSchema = z.object({
    title: optionalString(),
    category: optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
});

export const editSalesDocumentSchema = z.object({
    id: z.string().uuid(),
    title: optionalString(),
    category: optionalString(),
    number: optionalString(),
    issuedAt: optionalString(),
    currency: optionalString(),
    projectId: optionalString(),
    referenceNumber: optionalString(),
    projectDescription: optionalString(),
    freelancerName: optionalString(),
    freelancerEmail: optionalString(),
    freelancerPhone: optionalString(),
    freelancerTaxId: optionalString(),
    freelancerAddress: optionalString(),
    clientId: optionalString(),
    clientName: optionalString(),
    clientTaxId: optionalString(),
    clientAddress: optionalString(),
    clientPhone: optionalString(),
    clientOffice: optionalString(),
    clientDetail: optionalString(),
    subtotal: z.number().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    total: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    note: optionalString(),
    items: z.array(createSalesDocumentItemSchema).optional(),
});

export const salesDocumentPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    title: z.string().min(1),
    category: z.string().min(1),
    number: z.string().min(1),
    issuedAt: z.string(),
    currency: z.string().min(1),
    projectId: z.string(),
    referenceNumber: z.string().min(1),
    projectDescription: z.string().min(1),
    selectedProjectClientId: z.string(),
    freelancerName: z.string().min(1),
    freelancerEmail: z.string().email(),
    freelancerPhone: z.string().min(1),
    freelancerTaxId: z.string().min(1),
    freelancerAddress: optionalString(),
    clientId: z.string(),
    clientName: z.string().min(1),
    clientTaxId: z.string().min(1),
    clientAddress: optionalString(),
    clientPhone: optionalString(),
    clientOffice: optionalString(),
    clientDetail: optionalString(),
    subtotal: z.number(),
    discount: z.number().optional(),
    tax: z.number(),
    total: z.number(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    note: optionalString(),
    generatedFileId: optionalString(),
    createdAt: z.string(),
    updatedAt: z.string(),
    fileKey: z.string(),
    items: z.array(salesDocumentItemSchema),
});

export const createPdfSchema = z
    .object({
        id: z.string().uuid(),
        fileKey: optionalString(),
    })
    .merge(createSalesDocumentSchema);

export type SalesDocumentPayload = z.infer<typeof salesDocumentPayloadSchema>;
export type SalesDocumentFilterDto = z.infer<typeof salesDocumentFilterSchema>;
export type EditSalesDocumentDto = z.infer<typeof editSalesDocumentSchema>;
export type CreateSalesDocumentDto = z.infer<typeof createSalesDocumentSchema>;
export type CreatePdfDto = z.infer<typeof createPdfSchema>;
