import { z } from 'zod';
import { optionalString } from './helper/optional';
import { userCoreSchema } from './users.schema';

export const accessTokenPayloadSchema = z.object({
    sub: z.string().uuid(),
    role: z.string(),
});
export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;

export const refreshTokenPayloadSchema = z.object({
    sub: z.string().uuid(),
});
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;

export const loginDtoSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
export type LoginDto = z.infer<typeof loginDtoSchema>;

export const registerUserDtoSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    displayName: z.string().min(1),
});
export type RegisterUserDto = z.infer<typeof registerUserDtoSchema>;

export const resetPasswordRequestDtoSchema = z.object({
    email: z.string().email(),
});
export type ResetPasswordRequestDto = z.infer<
    typeof resetPasswordRequestDtoSchema
>;

export const resetPasswordDtoSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>;

export const googleOAuthPayloadSchema = z.object({
    emails: z
        .array(
            z.object({
                value: z.string().email(),
                type: z.string().optional(),
            })
        )
        .min(1),
    name: z.object({
        givenName: z.string(),
        familyName: z.string().optional(),
    }),
});
export type GoogleOAuthPayload = z.infer<typeof googleOAuthPayloadSchema>;

export const validateUserResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
});
export type ValidateUserResponse = z.infer<typeof validateUserResponseSchema>;

export const registerResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.object({
        id: z.string().uuid(),
        userId: z.string().uuid(),
        expiresAt: z.date(),
    }),
});
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const loginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string().uuid(),
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const logOutResponseSchema = z.object({});
export type LogOutResponse = z.infer<typeof logOutResponseSchema>;

export const resetPasswordRequestResponseSchema = z.object({});
export type ResetPasswordRequestResponse = z.infer<
    typeof resetPasswordRequestResponseSchema
>;

export const resetPasswordResponseSchema = z.object({
    message: z.string(),
});
export type ResetPasswordResponse = z.infer<typeof resetPasswordResponseSchema>;

export const validateAccessTokenResponseSchema = userCoreSchema;
export type ValidateAccessTokenResponse = z.infer<
    typeof validateAccessTokenResponseSchema
>;

export const validateRefreshTokenResponseSchema = userCoreSchema;
export type ValidateRefreshTokenResponse = z.infer<
    typeof validateRefreshTokenResponseSchema
>;

export const refreshAccessTokenResponseSchema = z.object({
    newAccessToken: z.string(),
    newRefreshToken: z.string().uuid(),
    user: userCoreSchema,
});
export type RefreshAccessTokenResponse = z.infer<
    typeof refreshAccessTokenResponseSchema
>;

export const googleLoginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string().uuid(),
    user: z.object({
        id: z.string().uuid(),
        email: z.string().email(),
    }),
});
export type GoogleLoginResponse = z.infer<typeof googleLoginResponseSchema>;
