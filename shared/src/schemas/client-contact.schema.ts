import { z } from 'zod';
import { clientSchema } from './client.schema';

export const createClientContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().min(1),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    detail: z.string().optional(),
    avatar: z.string().optional(),
});

export const clientContactFilterSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    companyId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
});

export const editClientContactSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    details: z.string().optional(),
    avatar: z.string().optional(),
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
    companyId: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    company: clientSchema
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
    companyId: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
});

export type ClientContact = z.infer<typeof clientContactSchema>;
export type ClientContactPayload = z.infer<typeof clientContactPayloadSchema>;
export type CreateClientContactDto = z.infer<typeof createClientContactSchema>;
export type ClientContactFilterDto = z.infer<typeof clientContactFilterSchema>;
export type EditClientContactDto = z.infer<typeof editClientContactSchema>;
