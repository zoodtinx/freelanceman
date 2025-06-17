import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';

export const partnerContactCoreSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string(),
    company: optionalString().optional(),
    role: optionalString().optional(),
    phoneNumber: optionalString().optional(),
    email: optionalString().optional(),
    details: optionalString().optional(),
    avatar: optionalString().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type PartnerContactCore = z.infer<typeof partnerContactCoreSchema>;

export const createPartnerContactSchema = z.object({
    name: z.string().min(1),
    company: optionalString().optional(),
    role: optionalString().optional(),
    phoneNumber: optionalString().optional(),
    email: optionalString().optional(),
    detail: optionalString().optional(),
    avatar: optionalString().optional(),
});
export type CreatePartnerContactDto = z.infer<
    typeof createPartnerContactSchema
>;

export const editPartnerContactSchema = z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    company: optionalString().optional(),
    role: optionalString().optional(),
    phoneNumber: optionalString().optional(),
    email: optionalString().optional(),
    detail: optionalString().optional(),
    avatar: optionalString().optional(),
});
export type EditPartnerContactDto = z.infer<typeof editPartnerContactSchema>;

export const partnerContactFilterSchema = z.object({
    name: optionalString(),
    role: optionalString(),
    company: optionalString(),
    projectId: optionalString(),
    take: optionalNumber(),
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
