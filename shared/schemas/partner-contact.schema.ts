import { z } from 'zod';

export const createPartnerContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().min(1),
    role: z.string().min(1),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    detail: z.string().optional(),
    avatar: z.string().url().optional(),
});

export const partnerContactFilterSchema = z.object({
    name: z.string().optional(),
    companyId: z.string().optional(),
    role: z.string().optional(),
});

export const updatePartnerContactSchema = z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    details: z.string().optional(),
    avatar: z.string().url().optional(),
});

export const partnerContactPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    companyId: z.string(),
    role: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.string().email(),
    details: z.string().min(1),
    avatar: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PartnerContactPayload = z.infer<typeof partnerContactPayloadSchema>;
export type CreatePartnerContactDto = z.infer<
    typeof createPartnerContactSchema
>;
export type PartnerContactFilterDto = z.infer<
    typeof partnerContactFilterSchema
>;
export type UpdatePartnerContactDto = z.infer<
    typeof updatePartnerContactSchema
>;
