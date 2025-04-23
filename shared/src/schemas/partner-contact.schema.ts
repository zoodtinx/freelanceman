import { z } from 'zod';
import { partnerCompanySchema } from './partner-company.schema';

export const createPartnerContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().transform(val => val.trim() === '' ? null : val),
    role: z.string().min(1),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    detail: z.string().optional(),
    avatar: z.string().optional(),
});

export const partnerContactFilterSchema = z.object({
    name: z.string().optional(),
    companyName: z.string().optional(),
    role: z.string().optional(),
});

export const editPartnerContactSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    detail: z.string().optional(),
    avatar: z.string().optional(),
});

export const partnerContactPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    companyId: z.string(),
    role: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.string(),
    detail: z.string().min(1),
    avatar: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string(),
    company: partnerCompanySchema
});

export const partnerContactSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    companyId: z.string(),
    role: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.string(),
    detail: z.string().min(1),
    avatar: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PartnerContact = z.infer<typeof partnerContactSchema>;
export type PartnerContactPayload = z.infer<typeof partnerContactPayloadSchema>;
export type CreatePartnerContactDto = z.infer<typeof createPartnerContactSchema>;
export type PartnerContactFilterDto = z.infer<typeof partnerContactFilterSchema>;
export type EditPartnerContactDto = z.infer<typeof editPartnerContactSchema>;
