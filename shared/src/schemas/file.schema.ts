import { z } from 'zod';
import { clientSchema } from './client.schema';
import { projectSchema } from './project.schema';
import { optionalNumber, optionalString } from './helper/optional';

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
    originalName: optionalString(),
    displayName: z.string(),
    type: z.string(),
    category: z.string(),
    link: z.string(),
    s3Key: optionalString(),
    url: optionalString(),
    projectId: optionalString(),
    size: z.number().optional(),
});
  
  export const editFileSchema = z.object({
    id: z.string().uuid(),
    displayName: optionalString(),
    type: fileType.optional(),
    category: optionalString(),
  });

export const fileFilterSchema = z.object({
    displayName: optionalString(),
    category: optionalString(),
    type: optionalString(),
    clientId: optionalString(),
    projectId: optionalString(),
    take: optionalNumber()
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
    s3Key: optionalString(),
    url:optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
    userId: z.string(),
    size: z.number().optional(),
    createdAt: z.string(),
    client: clientSchema,
    project: projectSchema
});

export const fileListPayloadSchema = z.object({
  total: z.number(),
  items: z.array(filePayloadSchema),
});

export const fileSchema = z.object({
    id: z.string().uuid(),
    originalName: z.string().min(1),
    displayName: z.string().min(1),
    type: z.string().min(1),
    category: z.string().min(1),
    link: z.string().min(1),
    s3Key: optionalString(),
    projectId: optionalString(),
    clientId: optionalString(),
    userId: z.string(),
    size: z.number().optional(),
    url: optionalString(),
});

export type File = z.infer<typeof fileSchema>;
export type FilePayload = z.infer<typeof filePayloadSchema>;
export type GetPresignedUrlDto = z.infer<typeof getPresignedUrlSchema>;
export type CreateFileDto = z.infer<typeof createFileSchema>;
export type EditFileDto = z.infer<typeof editFileSchema>;
export type FileFilterDto = z.infer<typeof fileFilterSchema>;
export type FileListPayload = z.infer<typeof fileListPayloadSchema>;