import { z } from 'zod';
import {
  nullableStringField,
  optionalNumberField,
  optionalStringField,
} from './helper/crudPreprocessor';

export const partnerContactCoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  company: nullableStringField(),
  role: nullableStringField(),
  phoneNumber: nullableStringField(),
  email: nullableStringField(),
  details: nullableStringField(),
  avatar: nullableStringField(),
  createdAt: nullableStringField(),
  updatedAt: nullableStringField(),
});
export type PartnerContactCore = z.infer<typeof partnerContactCoreSchema>;

export const createPartnerContactSchema = z.object({
  name: z.string().min(1),
  company: nullableStringField(),
  role: nullableStringField(),
  phoneNumber: nullableStringField(),
  email: nullableStringField(),
  details: nullableStringField(),
  avatar: nullableStringField(),
});
export type CreatePartnerContactDto = z.infer<
  typeof createPartnerContactSchema
>;

export const editPartnerContactSchema = z.object({
  id: z.string(),
  name: optionalStringField(),
  company: nullableStringField(),
  role: nullableStringField(),
  phoneNumber: nullableStringField(),
  email: nullableStringField(),
  details: nullableStringField(),
  avatar: nullableStringField(),
});
export type EditPartnerContactDto = z.infer<typeof editPartnerContactSchema>;

export const partnerContactFilterSchema = z.object({
  name: optionalStringField(),
  role: optionalStringField(),
  company: optionalStringField(),
  projectId: optionalStringField(),
  take: optionalNumberField(),
});
export type PartnerContactFilterDto = z.infer<
  typeof partnerContactFilterSchema
>;

export const createPartnerContactResponseSchema = partnerContactCoreSchema;
export type CreatePartnerContactResponse = z.infer<
  typeof createPartnerContactResponseSchema
>;

export const partnerContactFindManyItemSchema = partnerContactCoreSchema;
export type PartnerContactFindManyItem = z.infer<
  typeof partnerContactFindManyItemSchema
>;

export const partnerContactFindManyResponseSchema = z.object({
  items: z.array(partnerContactFindManyItemSchema),
  total: z.number(),
  unfilteredTotal: z.number(),
});
export type PartnerContactFindManyResponse = z.infer<
  typeof partnerContactFindManyResponseSchema
>;

export const partnerContactFindOneResponseSchema = partnerContactCoreSchema;
export type PartnerContactFindOneResponse = z.infer<
  typeof partnerContactFindOneResponseSchema
>;

export const updatePartnerContactResponseSchema = partnerContactCoreSchema;
export type UpdatePartnerContactResponse = z.infer<
  typeof updatePartnerContactResponseSchema
>;

export const removePartnerContactResponseSchema = z.object({
  success: z.boolean(),
});
export type RemovePartnerContactResponse = z.infer<
  typeof removePartnerContactResponseSchema
>;
