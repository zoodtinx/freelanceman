import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';

export const SalesDocumentCategoryEnum = z.enum([
    'quotation',
    'invoice',
    'receipt',
]);

export const salesDocumentItemCoreSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    title: z.string(),
    rate: z.number(),
    quantity: z.number().int(),
    description: optionalString().optional(),
    parentDocumentId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type SalesDocumentItemCore = z.infer<typeof salesDocumentItemCoreSchema>;

export const salesDocumentCoreSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    title: optionalString().optional(),
    category: SalesDocumentCategoryEnum,
    number: optionalString().optional(),
    issuedAt: z.string(),
    currency: optionalString().optional(),
    projectId: z.string().uuid(),
    referenceNumber: optionalString().optional(),
    projectTitle: optionalString().optional(),
    projectDescription: optionalString().optional(),
    freelancerName: z.string(),
    freelancerEmail: optionalString().optional(),
    freelancerPhone: optionalString().optional(),
    freelancerTaxId: optionalString().optional(),
    freelancerAddress: optionalString().optional(),
    clientId: z.string().uuid(),
    clientName: z.string(),
    clientTaxId: optionalString().optional(),
    clientAddress: optionalString().optional(),
    clientPhone: optionalString().optional(),
    clientOffice: optionalString().optional(),
    clientDetail: optionalString().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    total: z.number().optional(),
    note: optionalString().optional(),
    s3Key: optionalString().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type SalesDocumentCore = z.infer<typeof salesDocumentCoreSchema>;

export const createSalesDocumentItemDtoSchema = z.object({
    title: z.string().min(1),
    rate: z.number().nonnegative(),
    quantity: z.number().int().positive(),
    description: optionalString().optional(),
});
export type CreateSalesDocumentItemDto = z.infer<
    typeof createSalesDocumentItemDtoSchema
>;

export const createSalesDocumentSchema = z.object({
    category: SalesDocumentCategoryEnum,
    number: optionalString().optional(),
    issuedAt: z.string(),
    currency: optionalString().optional(),
    projectId: z.string().uuid(),
    referenceNumber: optionalString().optional(),
    projectTitle: optionalString().optional(),
    projectDescription: optionalString().optional(),
    freelancerName: z.string().min(1),
    freelancerEmail: optionalString().optional(),
    freelancerPhone: optionalString().optional(),
    freelancerTaxId: optionalString().optional(),
    freelancerAddress: optionalString().optional(),
    clientId: z.string().uuid(),
    clientName: z.string().min(1),
    clientTaxId: optionalString().optional(),
    clientAddress: optionalString().optional(),
    clientPhone: optionalString().optional(),
    clientOffice: optionalString().optional(),
    clientDetail: optionalString().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    total: z.number().optional(),
    note: optionalString().optional(),
    items: z.array(createSalesDocumentItemDtoSchema),
});
export type CreateSalesDocumentDto = z.infer<typeof createSalesDocumentSchema>;

export const editSalesDocumentSchema = z.object({
    title: optionalString().optional(),
    category: SalesDocumentCategoryEnum.optional(),
    number: optionalString().optional(),
    issuedAt: z.string().optional(),
    currency: optionalString().optional(),
    projectId: z.string().uuid().optional(),
    referenceNumber: optionalString().optional(),
    projectTitle: optionalString().optional(),
    projectDescription: optionalString().optional(),
    freelancerName: z.string().min(1).optional(),
    freelancerEmail: optionalString().optional(),
    freelancerPhone: optionalString().optional(),
    freelancerTaxId: optionalString().optional(),
    freelancerAddress: optionalString().optional(),
    clientId: z.string().uuid().optional(),
    clientName: z.string().min(1).optional(),
    clientTaxId: optionalString().optional(),
    clientAddress: optionalString().optional(),
    clientPhone: optionalString().optional(),
    clientOffice: optionalString().optional(),
    clientDetail: optionalString().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    discountPercent: z.number().optional(),
    discountFlat: z.number().optional(),
    total: z.number().optional(),
    note: optionalString().optional(),
    s3Key: optionalString().optional(),

    items: z.array(createSalesDocumentItemDtoSchema).optional(),
});
export type EditSalesDocumentDto = z.infer<typeof editSalesDocumentSchema>;

export const salesDocumentFilterSchema = z.object({
    title: optionalString(),
    category: optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
});
export type SalesDocumentFilterDto = z.infer<typeof salesDocumentFilterSchema>;

export const createPdfDtoSchema = salesDocumentCoreSchema.extend({
    id: z.string().uuid(),
    category: SalesDocumentCategoryEnum,
    projectTitle: optionalString(),
    s3Key: optionalString().optional().nullable(),
    items: z.array(createSalesDocumentItemDtoSchema),
});
export type CreatePdfDto = z.infer<typeof createPdfDtoSchema>;

export const createSalesDocumentResponseSchema = salesDocumentCoreSchema;
export type CreateSalesDocumentResponse = z.infer<
    typeof createSalesDocumentResponseSchema
>;

export const salesDocumentFindManyItemSchema = salesDocumentCoreSchema;
export type SalesDocumentFindManyItem = z.infer<
    typeof salesDocumentFindManyItemSchema
>;

export const salesDocumentFindManyResponseSchema = z.array(
    salesDocumentFindManyItemSchema
);
export type SalesDocumentFindManyResponse = z.infer<
    typeof salesDocumentFindManyResponseSchema
>;

export const salesDocumentFindOneResponseSchema =
    salesDocumentCoreSchema.extend({
        items: z.array(salesDocumentItemCoreSchema),
    });
export type SalesDocumentFindOneResponse = z.infer<
    typeof salesDocumentFindOneResponseSchema
>;

export const updateSalesDocumentResponseSchema = salesDocumentCoreSchema;
export type UpdateSalesDocumentResponse = z.infer<
    typeof updateSalesDocumentResponseSchema
>;

export const deleteSalesDocumentResponseSchema = z.object({
    id: z.string().uuid(),
    s3Key: optionalString().optional(),
});
export type DeleteSalesDocumentResponse = z.infer<
    typeof deleteSalesDocumentResponseSchema
>;

export const createPdfResponseSchema = z.object({
    pdfUrl: z.string().url(),
});
export type CreatePdfResponse = z.infer<typeof createPdfResponseSchema>;
