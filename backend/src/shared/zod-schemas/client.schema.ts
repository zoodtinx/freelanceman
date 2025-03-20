import { z } from 'zod';

export const createClientSchema = z.object({
    name: z.string().min(1),
    taxId: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    detail: z.string().optional(),
    userId: z.string().min(1),
    themeColor: z.string().min(1),
});