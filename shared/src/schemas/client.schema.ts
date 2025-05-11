import { z } from 'zod';
import { projectSchema } from './project.schema';
import { clientContactSchema } from './client-contact.schema';
import { optionalString } from './helper/optional';

export const createClientSchema = z.object({
    name: z.string().min(1),
    taxId: optionalString(),
    email: optionalString(),
    phoneNumber: optionalString(),
    address: optionalString(),
    detail: optionalString(),
    themeColor: z.string().min(1),
});

export const editClientSchema = z.object({
    id: z.string().uuid(),
    name: optionalString(),
    taxId: optionalString(),
    email: optionalString(),
    phoneNumber: optionalString(),
    address: optionalString(),
    themeColor: optionalString(),
    note: optionalString(),
});

export const clientFilterSchema = z.object({
    name: optionalString(),
    hasActiveProject: optionalString(),
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
    updatedAt: optionalString(),
    projects: z.array(projectSchema),
    contacts: z.array(clientContactSchema),
    note: optionalString(),
});

export const clientListPayloadSchema = z.object({
  total: z.number(),
  items: z.array(clientPayloadSchema),
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
    updatedAt: optionalString(),
    note: optionalString(),
});

export type Client = z.infer<typeof clientSchema>;
export type ClientPayload = z.infer<typeof clientPayloadSchema>;
export type ClientListPayload = z.infer<typeof clientListPayloadSchema>;
export type CreateClientDto = z.infer<typeof createClientSchema>;
export type EditClientDto = z.infer<typeof editClientSchema>;
export type ClientFilterDto = z.infer<typeof clientFilterSchema>;
