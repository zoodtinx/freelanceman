import { z } from "zod";

const fileType = z.enum([
  "image",
  "video",
  "document",
  "code",
  "design",
  "spreadsheet",
  "presentation",
  "audio",
  "archive",
  "video-editing",
  "project-management",
  "database",
  "other",
]);

const fileCategory = z.enum(["personal", "document", "work", "asset"]);

export const createFileSchema = z.object({
  originalName: z.string().min(1),
  displayName: z.string().min(1),
  type: fileType,
  category: fileCategory,
  link: z.string().url(),
  projectId: z.string().optional(),
  clientId: z.string().optional(),
  size: z.number().optional(),
});

export const updateFileSchema = z.object({
  displayName: z.string().min(1),
  type: fileType,
});

export const searchFileSchema = z.object({
  displayName: z.string().optional(),
  category: fileCategory.optional(),
  type: fileType.optional(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
});

export const getPresignedUrlSchema = z.object({
  filename: z.string().min(1),
  category: z.string().min(1),
  contentType: z.string().min(1),
});

export type GetPresignedUrlDto = z.infer<typeof getPresignedUrlSchema>;
export type CreateFileDto = z.infer<typeof createFileSchema>;
export type UpdateFileDto = z.infer<typeof updateFileSchema>;
export type SearchFileDto = z.infer<typeof searchFileSchema>;
