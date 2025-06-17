import { z } from 'zod';

export const s3GetPresignedUrlDtoSchema = z.object({
    fileName: z.string().min(1),
    category: z.string().min(1),
    contentType: z.string().min(1),
});
export type S3GetPresignedUrlDto = z.infer<typeof s3GetPresignedUrlDtoSchema>;

export const s3GetPresignedUrlResponseSchema = z.object({
    url: z.string().url(),
    key: z.string(),
});
export type S3GetPresignedUrlResponse = z.infer<
    typeof s3GetPresignedUrlResponseSchema
>;

export const s3GetSignedUrlForDownloadResponseSchema = z.object({
    url: z.string().url(),
});
export type S3GetSignedUrlForDownloadResponse = z.infer<
    typeof s3GetSignedUrlForDownloadResponseSchema
>;

export const s3UploadAndGetSignedUrlResponseSchema = z.object({
    key: z.string(),
    signedUrl: z.string().url(),
});
export type S3UploadAndGetSignedUrlResponse = z.infer<
    typeof s3UploadAndGetSignedUrlResponseSchema
>;

export const s3DeleteFileResponseSchema = z.object({});
export type S3DeleteFileResponse = z.infer<typeof s3DeleteFileResponseSchema>;
