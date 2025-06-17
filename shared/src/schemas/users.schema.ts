import { z } from 'zod';
import { optionalString, nullableOptionalString } from './helper/optional';

export const UserRoleEnum = z.enum(['user', 'admin']);
export const UserCurrencyEnum = z.enum(['THB', 'USD', 'EUR']);

export const visitingStatusCoreSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    homePage: z.boolean(),
    actionsPage: z.boolean(),
    allClientsPage: z.boolean(),
    partnersPage: z.boolean(),
    incomePage: z.boolean(),
    filesPage: z.boolean(),
    projectPage: z.boolean(),
    documentBuilderPage: z.boolean(),
});
export type VisitingStatusCore = z.infer<typeof visitingStatusCoreSchema>;

export const userCoreSchema = z.object({
    id: z.string().uuid(),
    isDemo: z.boolean(),
    isFirstTimeVisitor: z.boolean(),
    displayName: z.string(),
    email: z.string().email(),
    password: optionalString().optional(),
    specialization: z.array(z.string()),
    bio: optionalString().optional(),
    role: UserRoleEnum,
    phoneNumber: optionalString().optional(),
    address: optionalString().optional(),
    avatar: optionalString().optional(),
    pinnedProjects: z.array(z.string()),
    currency: UserCurrencyEnum,
    taxId: optionalString().optional(),
    quitting: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type UserCore = z.infer<typeof userCoreSchema>;

export const editUserSchema = z.object({
    id: z.string(),
    displayName: z.string().optional(),
    email: z.string().email().optional(),
    password: optionalString().optional(),
    specialization: z.array(z.string()).optional(),
    bio: optionalString().optional(),
    role: UserRoleEnum.optional(),
    phoneNumber: optionalString().optional(),
    address: optionalString().optional(),
    avatar: optionalString().optional(),
    pinnedProjects: z.array(z.string()).optional(),
    currency: UserCurrencyEnum.optional(),
    taxId: optionalString().optional(),
    quitting: z.boolean().optional(),
});
export type EditUserDto = z.infer<typeof editUserSchema>;

export const userFindOneResponseSchema = userCoreSchema.extend({
    visitingStatus: visitingStatusCoreSchema.nullable(),
});
export type UserFindOneResponse = z.infer<typeof userFindOneResponseSchema>;

export const updateUserResponseSchema = userFindOneResponseSchema;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;

export const setVisitedResponseSchema = z.object({});
export type SetVisitedResponse = z.infer<typeof setVisitedResponseSchema>;
