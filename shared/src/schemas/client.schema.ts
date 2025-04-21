import { z } from 'zod';
import { projectSchema } from './project.schema';
import { clientContactSchema } from './client-contact.schema';

export const createClientSchema = z.object({
    name: z.string().min(1),
    taxId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    detail: z.string().optional(),
    themeColor: z.string().min(1),
});

export const editClientSchema = z.object({
    id: z.string().uuid(),
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
    email: z.string(),
    phoneNumber: z.string().min(1),
    address: z.string().min(1),
    detail: z.string().min(1),
    themeColor: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    projects: z.array(projectSchema),
    contacts: z.array(clientContactSchema),
});

export const clientSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1),
    taxId: z.string().min(1),
    email: z.string(),
    phoneNumber: z.string().min(1),
    address: z.string().min(1),
    detail: z.string().min(1),
    themeColor: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
});

export type Client = z.infer<typeof clientSchema>;
export type ClientPayload = z.infer<typeof clientPayloadSchema>;
export type CreateClientDto = z.infer<typeof createClientSchema>;
export type EditClientDto = z.infer<typeof editClientSchema>;
export type ClientFilterDto = z.infer<typeof clientFilterSchema>;
