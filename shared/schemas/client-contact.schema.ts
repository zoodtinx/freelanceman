import { z } from 'zod';

export const createClientContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().min(1),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
    detail: z.string().optional(),
    avatar: z.string().url().optional(),
});

export const clientContactFilterSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    companyId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
});

export const updateClientContactSchema = z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
    details: z.string().optional(),
    avatar: z.string().url().optional(),
});

const clientContactPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    role: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.string().email(),
    details: z.string().min(1),
    avatar: z.string().min(1),
    companyId: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});

export type ClientContactPayload = z.infer<typeof clientContactPayloadSchema>;
export type CreateClientContactDto = z.infer<typeof createClientContactSchema>;
export type ClientContactFilterDto = z.infer<typeof clientContactFilterSchema>;
export type UpdateClientContactDto = z.infer<typeof updateClientContactSchema>;
