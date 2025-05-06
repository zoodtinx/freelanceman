import { z } from 'zod';

export const prismaPayloadSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export interface PrismaPayloadInterface {
    id: string;
    createdAt: string;
    updatedAt: string;
}
