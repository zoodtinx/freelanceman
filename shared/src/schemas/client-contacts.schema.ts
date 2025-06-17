import { z } from 'zod';
import { optionalString } from './helper/optional';
import { clientCoreSchema } from './clients.schema';

export const clientContactCoreSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string(),
    role: optionalString().optional(),
    phoneNumber: optionalString().optional(),
    email: optionalString().optional(),
    details: optionalString().optional(),
    avatar: optionalString().optional(),
    companyId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
});
export type ClientContactCore = z.infer<typeof clientContactCoreSchema>;

export const createClientContactSchema = z.object({
    name: z.string().min(1),
    role: optionalString().optional(),
    phoneNumber: optionalString().optional(),
    email: optionalString().optional(),
    details: optionalString().optional(),
    avatar: optionalString().optional(),
    companyId: z.string().uuid(),
});
export type CreateClientContactDto = z.infer<typeof createClientContactSchema>;

export const editClientContactSchema = z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    role: optionalString().optional(),
    phoneNumber: optionalString().optional(),
    email: optionalString().optional(),
    details: optionalString().optional(),
    avatar: optionalString().optional(),
    companyId: z.string().uuid().optional(),
});
export type EditClientContactDto = z.infer<typeof editClientContactSchema>;

export const clientContactFilterSchema = z.object({
    id: optionalString(),
    name: optionalString(),
    companyId: optionalString(),
    email: optionalString(),
    phoneNumber: optionalString(),
    projectId: optionalString(),
    take: z.number().int().optional(),
});
export type ClientContactFilterDto = z.infer<typeof clientContactFilterSchema>;

export const createClientContactResponseSchema = clientContactCoreSchema;
export type CreateClientContactResponse = z.infer<
    typeof createClientContactResponseSchema
>;

export const clientContactFindManyItemSchema = clientContactCoreSchema.extend({
    company: clientCoreSchema.nullable(),
});
export type ClientContactFindManyItem = z.infer<
    typeof clientContactFindManyItemSchema
>;

export const clientContactFindManyResponseSchema = z.object({
    items: z.array(clientContactFindManyItemSchema),
    total: z.number(),
    unfilteredTotal: z.number(),
});
export type ClientContactFindManyResponse = z.infer<
    typeof clientContactFindManyResponseSchema
>;

export const clientContactFindOneResponseSchema = clientContactCoreSchema;
export type ClientContactFindOneResponse = z.infer<
    typeof clientContactFindOneResponseSchema
>;

export const updateClientContactResponseSchema = clientContactCoreSchema;
export type UpdateClientContactResponse = z.infer<
    typeof updateClientContactResponseSchema
>;

export const removeClientContactResponseSchema = clientContactCoreSchema;
export type RemoveClientContactResponse = z.infer<
    typeof removeClientContactResponseSchema
>;
