import { z } from 'zod';
import {
    nullableStringField,
    nullableNumberField,
    nullableUuidField,
    optionalNumberField,
    optionalStringField,
} from './helper/crudPreprocessor';
import { clientCoreSchema } from './clients.schema';
import { projectCoreSchema } from './projects.schema';

export const fileType = z.enum([
    'image',
    'video',
    'document',
    'code',
    'design',
    'spreadsheet',
    'presentation',
    'audio',
    'archive',
    'video-editing',
    'project-management',
    'database',
    'other',
]);
export type FileType = z.infer<typeof fileType>;

export const fileCategory = z.enum(['work', 'asset']);
export type FileCategory = z.infer<typeof fileCategory>;

export const fileCoreSchema = z.object({
    id: z.string(),
    originalName: nullableStringField(),
    name: z.string(),
    type: fileType,
    category: fileCategory,
    link: nullableStringField(),
    s3Key: nullableStringField(),
    url: nullableStringField(),
    projectId: nullableUuidField(),
    clientId: nullableUuidField(),
    userId: z.string(),
    size: nullableNumberField(),
    createdAt: nullableStringField(),
    updatedAt: nullableStringField(),
});
export type FileCore = z.infer<typeof fileCoreSchema>;

export const createFileSchema = z.object({
    originalName: nullableStringField(),
    name: z.string().min(1),
    type: fileType,
    category: fileCategory,
    link: nullableStringField(),
    s3Key: nullableStringField(),
    url: nullableStringField(),
    projectId: nullableUuidField(),
    size: nullableNumberField(),
});
export type CreateFileDto = z.infer<typeof createFileSchema>;

export const editFileSchema = z.object({
    id: z.string(),
    originalName: nullableStringField(),
    name: z.string().min(1),
    type: fileType,
    category: fileCategory,
    link: nullableStringField(),
    s3Key: nullableStringField(),
    url: nullableStringField(),
    projectId: nullableUuidField(),
    clientId: nullableUuidField(),
    size: nullableNumberField(),
});
export type EditFileDto = z.infer<typeof editFileSchema>;

export const fileFilterSchema = z.object({
    name: optionalStringField(),
    type: fileType,
    category: fileCategory,
    clientId: optionalStringField(),
    projectId: optionalStringField(),
    take: optionalNumberField(),
});
export type FileFilterDto = z.infer<typeof fileFilterSchema>;

export const createFileResponseSchema = fileCoreSchema;
export type CreateFileResponse = z.infer<typeof createFileResponseSchema>;

export const fileFindManyItemSchema = fileCoreSchema.extend({
    client: clientCoreSchema,
    project: projectCoreSchema,
});
export type FileFindManyItem = z.infer<typeof fileFindManyItemSchema>;

export const fileFindManyResponseSchema = z.object({
    items: z.array(fileFindManyItemSchema),
    total: z.number(),
    unfilteredTotal: z.number(),
});
export type FileFindManyResponse = z.infer<typeof fileFindManyResponseSchema>;

export const fileFindOneResponseSchema = fileCoreSchema;
export type FileFindOneResponse = z.infer<typeof fileFindOneResponseSchema>;

export const updateFileResponseSchema = fileCoreSchema;
export type UpdateFileResponse = z.infer<typeof updateFileResponseSchema>;

export const deleteFileResponseSchema = fileCoreSchema;
export type DeleteFileResponse = z.infer<typeof deleteFileResponseSchema>;

export const deleteManyFilesResponseSchema = z.object({
    count: z.number().int(),
});
export type DeleteManyFilesResponse = z.infer<
    typeof deleteManyFilesResponseSchema
>;
