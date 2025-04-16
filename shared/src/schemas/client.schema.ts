import { z } from 'zod';

export const createClientSchema = z.object({
    name: z.string().min(1),
    taxId: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    detail: z.string().optional(),
    themeColor: z.string().min(1),
});

export const updateClientSchema = z.object({
    name: z.string().optional(),
    taxId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    detail: z.string().optional(),
    themeColor: z.string().optional(),
});

export const clientFilterSchema = z.object({
    name: z.string().optional(),
    hasActiveProject: z.boolean().optional(),
});

export const clientPayloadSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    taxId: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
    address: z.string().min(1),
    detail: z.string().min(1),
    themeColor: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
});

export type ClientPayload = z.infer<typeof clientPayloadSchema>;
export type CreateClientDto = z.infer<typeof createClientSchema>;
export type UpdateClientDto = z.infer<typeof updateClientSchema>;
export type ClientFilterDto = z.infer<typeof clientFilterSchema>;
