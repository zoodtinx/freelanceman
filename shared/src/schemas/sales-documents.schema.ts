import { z } from 'zod';
import {
  nullableStringField,
  nullableNumberField,
  nullableUuidField,
  optionalStringField
} from './helper/crudPreprocessor';

export const SalesDocumentCategoryEnum = z.enum([
  'quotation',
  'invoice',
  'receipt',
]);

export const salesDocumentItemCoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  rate: z.number(),
  quantity: z.number().int(),
  description: nullableStringField(),
  parentDocumentId: z.string(),
  createdAt: nullableStringField(),
  updatedAt: nullableStringField(),
});
export type SalesDocumentItemCore = z.infer<typeof salesDocumentItemCoreSchema>;

export const salesDocumentCoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: nullableStringField(),
  category: SalesDocumentCategoryEnum,
  number: nullableStringField(),
  issuedAt: z.string(),
  currency: nullableStringField(),
  projectId: z.string(),
  referenceNumber: nullableStringField(),
  projectTitle: nullableStringField(),
  projectDescription: nullableStringField(),
  freelancerName: z.string().min(1),
  freelancerEmail: nullableStringField(),
  freelancerPhone: nullableStringField(),
  freelancerTaxId: nullableStringField(),
  freelancerAddress: nullableStringField(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  clientTaxId: nullableStringField(),
  clientAddress: nullableStringField(),
  clientPhone: nullableStringField(),
  clientOffice: nullableStringField(),
  clientDetail: nullableStringField(),
  discount: nullableNumberField(),
  tax: nullableNumberField(),
  discountPercent: nullableNumberField(),
  discountFlat: nullableNumberField(),
  total: nullableNumberField(),
  note: nullableStringField(),
  s3Key: nullableStringField(),
  createdAt: nullableStringField(),
  updatedAt: nullableStringField(),
});
export type SalesDocumentCore = z.infer<typeof salesDocumentCoreSchema>;

export const createSalesDocumentItemDtoSchema = z.object({
  title: z.string().min(1),
  rate: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  description: nullableStringField(),
});
export type CreateSalesDocumentItemDto = z.infer<
  typeof createSalesDocumentItemDtoSchema
>;

export const createSalesDocumentSchema = z.object({
  category: SalesDocumentCategoryEnum,
  number: nullableStringField(),
  issuedAt: z.string(),
  currency: nullableStringField(),
  projectId: z.string().uuid(),
  referenceNumber: nullableStringField(),
  projectTitle: nullableStringField(),
  projectDescription: nullableStringField(),
  freelancerName: z.string().min(1),
  freelancerEmail: nullableStringField(),
  freelancerPhone: nullableStringField(),
  freelancerTaxId: nullableStringField(),
  freelancerAddress: nullableStringField(),
  clientId: nullableStringField(),
  clientName: z.string().min(1),
  clientTaxId: nullableStringField(),
  clientAddress: nullableStringField(),
  clientPhone: nullableStringField(),
  clientOffice: nullableStringField(),
  clientDetail: nullableStringField(),
  discount: nullableNumberField(),
  tax: nullableNumberField(),
  discountPercent: nullableNumberField(),
  discountFlat: nullableNumberField(),
  total: nullableNumberField(),
  note: nullableStringField(),
  items: z.array(createSalesDocumentItemDtoSchema),
});
export type CreateSalesDocumentDto = z.infer<typeof createSalesDocumentSchema>;

export const editSalesDocumentSchema = z.object({
  id: z.string().uuid(),
  title: nullableStringField(),
  category: SalesDocumentCategoryEnum.optional(),
  number: nullableStringField(),
  issuedAt: nullableStringField(),
  currency: nullableStringField(),
  projectId: nullableUuidField(),
  referenceNumber: nullableStringField(),
  projectTitle: nullableStringField(),
  projectDescription: nullableStringField(),
  freelancerName: z.string().min(1).optional(),
  freelancerEmail: nullableStringField(),
  freelancerPhone: nullableStringField(),
  freelancerTaxId: nullableStringField(),
  freelancerAddress: nullableStringField(),
  clientId: nullableUuidField(),
  clientName: z.string().min(1).optional(),
  clientTaxId: nullableStringField(),
  clientAddress: nullableStringField(),
  clientPhone: nullableStringField(),
  clientOffice: nullableStringField(),
  clientDetail: nullableStringField(),
  discount: nullableNumberField(),
  tax: nullableNumberField(),
  discountPercent: nullableNumberField(),
  discountFlat: nullableNumberField(),
  total: nullableNumberField(),
  note: nullableStringField(),
  s3Key: nullableStringField(),
  items: z.array(createSalesDocumentItemDtoSchema).optional(),
});
export type EditSalesDocumentDto = z.infer<typeof editSalesDocumentSchema>;

export const salesDocumentFilterSchema = z.object({
  title: optionalStringField(),
  category: optionalStringField(),
  projectId: optionalStringField(),
  clientId: optionalStringField(),
});
export type SalesDocumentFilterDto = z.infer<typeof salesDocumentFilterSchema>;

export const createPdfDtoSchema = salesDocumentCoreSchema.extend({
  id: z.string(),
  category: SalesDocumentCategoryEnum,
  projectTitle: nullableStringField(),
  s3Key: nullableStringField(),
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

export const salesDocumentFindOneResponseSchema = salesDocumentCoreSchema.extend({
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
  id: z.string(),
  s3Key: nullableStringField(),
});
export type DeleteSalesDocumentResponse = z.infer<
  typeof deleteSalesDocumentResponseSchema
>;

export const createPdfResponseSchema = z.object({
  pdfUrl: z.string().url(),
});
export type CreatePdfResponse = z.infer<typeof createPdfResponseSchema>;
