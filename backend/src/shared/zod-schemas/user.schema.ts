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

export const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const resetPasswordRequestSchema = z.object({
    email: z.string().email('Invalid email format'),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordRequestDto = z.infer<typeof resetPasswordRequestSchema>;
