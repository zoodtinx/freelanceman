import { z } from 'zod';
import { partnerCompanySchema } from './partner-company.schema';
import { optionalNumber, optionalString } from './helper/optional';

export const createPartnerContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().transform((val) => (val.trim() === '' ? null : val)),
    role: z.string().min(1),
    phoneNumber: optionalString(),
    email: optionalString(),
    detail: optionalString(),
    avatar: optionalString(),
});

export const partnerContactFilterSchema = z.object({
    name: optionalString(),
    companyName: optionalString(),
    role: optionalString(),
    projectId: optionalString(),
    take: optionalNumber()
});

export const editPartnerContactSchema = z.object({
    id: z.string().uuid(),
    name: optionalString(),
    role: optionalString(),
    phoneNumber: optionalString(),
    email: optionalString(),
    detail: optionalString(),
    avatar: optionalString(),
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
    company: partnerCompanySchema,
});

export const partnerContactListPayloadSchema = z.object({
  total: z.number(),
  items: z.array(partnerContactPayloadSchema),
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
export type CreatePartnerContactDto = z.infer<
    typeof createPartnerContactSchema
>;
export type PartnerContactFilterDto = z.infer<
    typeof partnerContactFilterSchema
>;
export type EditPartnerContactDto = z.infer<typeof editPartnerContactSchema>;
export type PartnerContactListPayload = z.infer<typeof partnerContactListPayloadSchema>;
