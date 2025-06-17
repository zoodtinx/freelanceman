import { z } from 'zod';
import { optionalString, optionalNumber } from './helper/optional';
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
    id: z.string().uuid(),
    originalName: optionalString().optional(),
    name: z.string(),
    type: fileType,
    category: fileCategory,
    link: optionalString().optional(),
    s3Key: optionalString().optional(),
    url: optionalString().optional(),
    projectId: z.string().uuid().nullable(),
    clientId: z.string().uuid().nullable(),
    userId: z.string().uuid(),
    size: z.number().int().optional(),
    createdAt: optionalString(),
    updatedAt: optionalString()
});
export type FileCore = z.infer<typeof fileCoreSchema>;

export const createFileSchema = z.object({
    originalName: optionalString().optional(),
    name: z.string().min(1),
    type: fileType,
    category: fileCategory,
    link: optionalString().optional(),
    s3Key: optionalString().optional(),
    url: optionalString().optional(),
    projectId: z.string().uuid().optional(),
    size: z.number().int().optional(),
});
export type CreateFileDto = z.infer<typeof createFileSchema>;

export const editFileSchema = z.object({
    id: z.string(),
    originalName: optionalString().optional(),
    name: z.string().min(1).optional(),
    type: fileType.optional(),
    category: fileCategory.optional(),
    link: optionalString().optional(),
    s3Key: optionalString().optional(),
    url: optionalString().optional(),
    projectId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    size: z.number().int().optional(),
});
export type EditFileDto = z.infer<typeof editFileSchema>;

export const fileFilterSchema = z.object({
    name: optionalString(),
    type: fileType.optional(),
    category: fileCategory.optional(),
    clientId: optionalString(),
    projectId: optionalString(),
    take: optionalNumber(),
});
export type FileFilterDto = z.infer<typeof fileFilterSchema>;

export const createFileResponseSchema = fileCoreSchema;
export type CreateFileResponse = z.infer<typeof createFileResponseSchema>;

export const fileFindManyItemSchema = fileCoreSchema.extend({
    client: z.lazy(() => clientCoreSchema).nullable(),
    project: z.lazy(() => projectCoreSchema).nullable(),
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
