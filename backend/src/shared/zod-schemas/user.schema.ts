import { z } from 'zod';

export const registerUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    displayName: z.string().min(1, 'Display name is required'),
});

export const loginUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(8, 'Invalid refresh token'),
});