import { z } from 'zod';

export const createPartnerCompanySchema = z.object({
    name: z.string().min(1),
    taxId: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    detail: z.string().optional(),
});

export const updatePartnerCompanySchema = z.object({
    name: z.string().optional(),
    taxId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    detail: z.string().optional(),
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
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});

export const partnerCompanyFilterSchema = z.object({
    name: z.string().optional(),
});

export type PartnerCompanyPayload = z.infer<typeof partnerCompanyPayloadSchema>;

export type CreatePartnerCompanyDto = z.infer<
    typeof createPartnerCompanySchema
>;
export type UpdatePartnerCompanyDto = z.infer<
    typeof updatePartnerCompanySchema
>;
export type PartnerCompanyFilterDto = z.infer<
    typeof partnerCompanyFilterSchema
>;
