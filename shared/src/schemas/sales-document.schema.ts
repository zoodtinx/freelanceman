import { z } from 'zod';
import { filePayloadSchema } from './file.schema';
import { createSalesDocumentItemSchema, nestedCreateSalesDocumentItemSchema, salesDocumentItemSchema } from './sales-document-item.schema';
import { nullableOptionalString, optionalString } from './helper/optional';

export const createSalesDocumentSchema = z.object({
    category: z.string(),
    issuedAt: z.string(),
    projectId: z.string(),
    freelancerName: z.string().min(1),
    clientId: z.string(),
    clientName: z.string().min(1),
    items: z.array(nestedCreateSalesDocumentItemSchema).min(1),

    number: nullableOptionalString(),
    currency: nullableOptionalString(),
    projectTitle: nullableOptionalString(),
    referenceNumber: nullableOptionalString(),
    projectDescription: nullableOptionalString(),

    freelancerEmail: nullableOptionalString(),
    freelancerPhone: nullableOptionalString(),
    freelancerTaxId: nullableOptionalString(),
    freelancerAddress: nullableOptionalString(),

    clientTaxId: nullableOptionalString(),
    clientAddress: nullableOptionalString(),
    clientPhone: nullableOptionalString(),
    clientOffice: nullableOptionalString(),
    clientDetail: nullableOptionalString(),

    tax: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),

    note: nullableOptionalString(),
});

export const salesDocumentFilterSchema = z.object({
    title: nullableOptionalString(),
    category: nullableOptionalString(),
    projectId: nullableOptionalString(),
    clientId: nullableOptionalString(),
});

export const editSalesDocumentSchema = z.object({
    id: z.string().uuid(),
    title: nullableOptionalString(),
    category: optionalString(),
    number: nullableOptionalString(),
    issuedAt: optionalString(),
    currency: nullableOptionalString(),
    referenceNumber: nullableOptionalString(),
    projectDescription: nullableOptionalString(),
    freelancerName: optionalString(),
    freelancerEmail: nullableOptionalString(),
    freelancerPhone: nullableOptionalString(),
    freelancerTaxId: nullableOptionalString(),
    freelancerAddress: nullableOptionalString(),
    clientName: optionalString(),
    clientTaxId: nullableOptionalString(),
    clientAddress: nullableOptionalString(),
    clientPhone: nullableOptionalString(),
    clientOffice: nullableOptionalString(),
    clientDetail: nullableOptionalString(),
    subtotal: z.number().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    total: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    note: nullableOptionalString(),
    items: z.array(createSalesDocumentItemSchema).optional(),
});

export const salesDocumentPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    category: z.string().min(1),
    number: z.string().min(1),
    issuedAt: z.string(),
    currency: z.string().min(1),
    projectId: z.string(),
    projectTitle: z.string(),
    referenceNumber: z.string().min(1),
    projectDescription: z.string().min(1),
    selectedProjectClientId: z.string(),
    freelancerName: z.string().min(1),
    freelancerEmail: z.string().email(),
    freelancerPhone: z.string().min(1),
    freelancerTaxId: z.string().min(1),
    freelancerAddress: nullableOptionalString(),
    clientId: z.string(),
    clientName: z.string().min(1),
    clientTaxId: z.string().min(1),
    clientAddress: nullableOptionalString(),
    clientPhone: nullableOptionalString(),
    clientOffice: nullableOptionalString(),
    clientDetail: nullableOptionalString(),
    subtotal: z.number(),
    discount: z.number().optional(),
    tax: z.number(),
    total: z.number(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    note: nullableOptionalString(),
    generatedFileId: nullableOptionalString(),
    createdAt: z.string(),
    updatedAt: z.string(),
    fileKey: z.string(),
    items: z.array(salesDocumentItemSchema),
});

export const createPdfSchema = z
    .object({
        id: z.string().uuid(),
        fileKey: nullableOptionalString(),
    })
    .merge(createSalesDocumentSchema);

export type SalesDocumentPayload = z.infer<typeof salesDocumentPayloadSchema>;
export type SalesDocumentFilterDto = z.infer<typeof salesDocumentFilterSchema>;
export type EditSalesDocumentDto = z.infer<typeof editSalesDocumentSchema>;
export type CreateSalesDocumentDto = z.infer<typeof createSalesDocumentSchema>;
export type CreatePdfDto = z.infer<typeof createPdfSchema>;
