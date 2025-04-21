import { z } from 'zod';
import { clientSchema } from './client.schema';
import { projectSchema } from './project.schema';

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

export const fileCategory = z.enum(['personal', 'document', 'work', 'asset']);

export const createFileSchema = z.object({
    originalName: z.string(),
    displayName: z.string(),
    type: z.string(),
    category: z.string(),
    link: z.string(),
    s3Key: z.string(),
    projectId: z.string().optional(),
    clientId: z.string().optional(),
    size: z.number().optional(),
});

export const editFileSchema = z.object({
    id: z.string().uuid(),
    displayName: z.string().min(1).optional(),
    type: fileType.optional(),
});

export const fileFilterSchema = z.object({
    displayName: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
});

export const getPresignedUrlSchema = z.object({
    fileName: z.string().min(1),
    category: z.string().min(1),
    contentType: z.string().min(1),
});

export const filePayloadSchema = z.object({
    id: z.string().uuid(),
    originalName: z.string().min(1),
    displayName: z.string().min(1),
    type: z.string().min(1),
    category: z.string().min(1),
    link: z.string().min(1),
    s3Key: z.string().min(1),
    projectId: z.string().optional(),
    clientId: z.string().optional(),
    userId: z.string(),
    size: z.number().optional(),
    client: clientSchema,
    project: projectSchema
});

export const fileSchema = z.object({
    id: z.string().uuid(),
    originalName: z.string().min(1),
    displayName: z.string().min(1),
    type: z.string().min(1),
    category: z.string().min(1),
    link: z.string().min(1),
    s3Key: z.string().min(1),
    projectId: z.string().optional(),
    clientId: z.string().optional(),
    userId: z.string(),
    size: z.number().optional(),
});

export type File = z.infer<typeof fileSchema>;
export type FilePayload = z.infer<typeof filePayloadSchema>;
export type GetPresignedUrlDto = z.infer<typeof getPresignedUrlSchema>;
export type CreateFileDto = z.infer<typeof createFileSchema>;
export type EditFileDto = z.infer<typeof editFileSchema>;
export type FileFilterDto = z.infer<typeof fileFilterSchema>;
