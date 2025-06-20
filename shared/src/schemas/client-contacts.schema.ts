import { z } from 'zod';
import { clientCoreSchema } from './clients.schema';
import {
    nullableStringField,
    optionalNumberField,
    optionalStringField,
} from './helper/crudPreprocessor';

export const clientContactCoreSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    role: nullableStringField(),
    phoneNumber: nullableStringField(),
    email: nullableStringField(),
    details: nullableStringField(),
    avatar: nullableStringField(),
    companyId: z.string(),
    createdAt: nullableStringField(),
    updatedAt: nullableStringField(),
});
export type ClientContactCore = z.infer<typeof clientContactCoreSchema>;

export const createClientContactSchema = z.object({
    name: z.string().min(1), // not allow empty string
    role: nullableStringField(),
    phoneNumber: nullableStringField(),
    email: nullableStringField(),
    details: nullableStringField(),
    avatar: nullableStringField(),
    companyId: z.string(),
});
export type CreateClientContactDto = z.infer<typeof createClientContactSchema>;

export const editClientContactSchema = z.object({
    id: z.string(),
    name: nullableStringField(),
    role: nullableStringField(),
    phoneNumber: nullableStringField(),
    email: nullableStringField(),
    details: nullableStringField(),
    avatar: nullableStringField(),
    companyId: optionalStringField(),
});
export type EditClientContactDto = z.infer<typeof editClientContactSchema>;

export const clientContactFilterSchema = z.object({
    id: optionalStringField(),
    name: optionalStringField(),
    companyId: optionalStringField(),
    email: optionalStringField(),
    phoneNumber: optionalStringField(),
    projectId: optionalStringField(),
    take: optionalNumberField(),
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
