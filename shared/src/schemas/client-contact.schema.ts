import { z } from 'zod';
import { clientSchema } from './client.schema';
import { optionalNumber, optionalString } from './helper/optional';

export const createClientContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().min(1),
    role: optionalString(),
    phoneNumber: optionalString(),
    email: optionalString(),
    detail: optionalString(),
    avatar: optionalString(),
});

export const clientContactFilterSchema = z.object({
    id: optionalString(),
    name: optionalString(),
    companyId: optionalString(),
    email: optionalString(),
    phoneNumber: optionalString(),
    projectId: optionalString(),
    take: optionalNumber()
});

export const editClientContactSchema = z.object({
    id: z.string().uuid(),
    name: optionalString(),
    role: optionalString(),
    phoneNumber: optionalString(),
    email: optionalString(),
    details: optionalString(),
    avatar: optionalString(),
});

export const clientContactPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    role: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.string(),
    details: z.string().min(1),
    avatar: z.string().min(1),
    companyId: optionalString(),
    createdAt: z.string(),
    updatedAt: optionalString(),
    company: clientSchema
});

export const clientContactListPayloadSchema = z.object({
    total: z.number(),
    items: z.array(clientContactPayloadSchema),
});

export const clientContactSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    role: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.string(),
    details: z.string().min(1),
    avatar: z.string().min(1),
    companyId: optionalString(),
    createdAt: z.string(),
    updatedAt: optionalString(),
});

export type ClientContact = z.infer<typeof clientContactSchema>;
export type ClientContactPayload = z.infer<typeof clientContactPayloadSchema>;
export type ClientContactListPayload = z.infer<typeof clientContactListPayloadSchema>;
export type CreateClientContactDto = z.infer<typeof createClientContactSchema>;
export type ClientContactFilterDto = z.infer<typeof clientContactFilterSchema>;
export type EditClientContactDto = z.infer<typeof editClientContactSchema>;




export interface CreateClientContact {
    name: string;
    role: string;
    phoneNumber: string;
    email: string;
    detail: string;
}