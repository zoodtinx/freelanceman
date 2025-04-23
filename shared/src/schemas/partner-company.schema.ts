import { z } from 'zod';
import { optionalString } from './helper/optional';

export const createPartnerCompanySchema = z.object({
    name: z.string().min(1),
    taxId: optionalString(),
    email: optionalString(),
    phoneNumber: optionalString(),
    address: optionalString(),
    detail: optionalString(),
});

export const editPartnerCompanySchema = z.object({
    id: z.string().uuid(),
    name: optionalString(),
    taxId: optionalString(),
    email: optionalString(),
    phoneNumber: optionalString(),
    address: optionalString(),
    detail: optionalString(),
});

export const partnerCompanyPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    taxId: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
    address: z.string().min(1),
    detail: z.string().min(1),
    createdAt: z.string(),
    updatedAt: optionalString(),
});

export const partnerCompanySchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    taxId: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
    address: z.string().min(1),
    detail: z.string().min(1),
    createdAt: z.string(),
    updatedAt: optionalString(),
});

export const partnerCompanyFilterSchema = z.object({
    name: optionalString(),
});

export type PartnerCompany = z.infer<typeof partnerCompanySchema>;
export type PartnerCompanyPayload = z.infer<typeof partnerCompanyPayloadSchema>;
export type CreatePartnerCompanyDto = z.infer<
    typeof createPartnerCompanySchema
>;
export type EditPartnerCompanyDto = z.infer<typeof editPartnerCompanySchema>;
export type PartnerCompanyFilterDto = z.infer<
    typeof partnerCompanyFilterSchema
>;
