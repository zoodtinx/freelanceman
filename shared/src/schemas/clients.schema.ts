import { z } from 'zod';
import {
    nullableStringField,
    optionalNumberField,
    optionalStringField,
} from './helper/crudPreprocessor';

import { userCoreSchema } from './users.schema';
import { clientContactCoreSchema } from './client-contacts.schema';
import { fileCoreSchema } from './files.schema';
import { taskCoreSchema } from './tasks.schema';
import { eventCoreSchema } from './events.schema';
import { projectCoreSchema } from './projects.schema';
import { salesDocumentCoreSchema } from './sales-documents.schema';

export const clientCoreSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    taxId: nullableStringField(),
    email: nullableStringField(),
    phoneNumber: nullableStringField(),
    address: nullableStringField(),
    detail: nullableStringField(),
    themeColor: z.string(),
    note: nullableStringField(),
    createdAt: nullableStringField(),
    updatedAt: nullableStringField(),
});
export type ClientCore = z.infer<typeof clientCoreSchema>;

export const createClientSchema = z.object({
    name: z.string().min(1),
    taxId: nullableStringField(),
    email: nullableStringField(),
    phoneNumber: nullableStringField(),
    address: nullableStringField(),
    detail: nullableStringField(),
    themeColor: z.string().min(1),
    note: nullableStringField(),
});
export type CreateClientDto = z.infer<typeof createClientSchema>;

export const editClientSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    taxId: nullableStringField(),
    email: nullableStringField(),
    phoneNumber: nullableStringField(),
    address: nullableStringField(),
    detail: nullableStringField(),
    themeColor: z.string().min(1),
    note: nullableStringField(),
});
export type EditClientDto = z.infer<typeof editClientSchema>;

export const clientFilterSchema = z.object({
    name: optionalStringField(),
    email: optionalStringField(),
    phoneNumber: optionalStringField(),
    take: optionalNumberField(),
});
export type ClientFilterDto = z.infer<typeof clientFilterSchema>;

export const createClientResponseSchema = clientCoreSchema;
export type CreateClientResponse = z.infer<typeof createClientResponseSchema>;

export const updateClientResponseSchema = clientCoreSchema;
export type UpdateClientResponse = z.infer<typeof updateClientResponseSchema>;

export const clientSelectionSchema = z.object({
    label: z.string(),
    value: z.string(),
});
export type ClientSelection = z.infer<typeof clientSelectionSchema>;

export const clientSelectionsListSchema = z.array(clientSelectionSchema);
export type ClientSelectionsList = z.infer<typeof clientSelectionsListSchema>;

export const clientFindManyItemSchema = clientCoreSchema.extend({
    contacts: z.array(clientContactCoreSchema),
    projects: z.array(projectCoreSchema),
});
export type ClientFindManyItem = z.infer<typeof clientFindManyItemSchema>;

export const clientFindManyResponseSchema = z.object({
    items: z.array(clientFindManyItemSchema),
    total: z.number(),
    unfilteredTotal: z.number(),
});
export type ClientFindManyResponse = z.infer<
    typeof clientFindManyResponseSchema
>;

export const clientFindOneResponseSchema = clientCoreSchema.extend({
    user: userCoreSchema,
    contacts: z.array(clientContactCoreSchema),
    files: z.array(fileCoreSchema),
    task: z.array(taskCoreSchema),
    event: z.array(eventCoreSchema),
    projects: z.array(projectCoreSchema),
    salesDocuments: z.array(salesDocumentCoreSchema),
});
export type ClientFindOneResponse = z.infer<typeof clientFindOneResponseSchema>;

export const removeClientResponseSchema = z.object({
    success: z.boolean(),
});
export type RemoveClientResponse = z.infer<typeof removeClientResponseSchema>;
