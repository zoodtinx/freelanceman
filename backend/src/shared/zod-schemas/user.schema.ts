import { z } from 'zod';

export const registerUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    displayName: z.string().min(1, 'Display name is required'),
});
