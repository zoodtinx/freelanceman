import { z } from 'zod';
import { nullableStringField, optionalStringField } from './helper/crudPreprocessor';

export const UserRoleEnum = z.enum(['user', 'admin']);

export const visitingStatusCoreSchema = z.object({
    id: z.string(),
    userId: z.string(),
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
    id: z.string(),
    isDemo: z.boolean(),
    isFirstTimeVisitor: z.boolean(),
    displayName: z.string(),
    email: z.string().email(),
    password: nullableStringField(),
    specialization: z.array(z.string()),
    bio: nullableStringField(),
    role: UserRoleEnum,
    phoneNumber: nullableStringField(),
    address: nullableStringField(),
    avatar: nullableStringField(),
    pinnedProjects: z.array(z.string()),
    currency: z.string(),
    taxId: nullableStringField(),
    quitting: z.boolean(),
    createdAt: nullableStringField(),
    updatedAt: nullableStringField(),
});
export type UserCore = z.infer<typeof userCoreSchema>;

export const editUserSchema = z.object({
    id: z.string(),
    displayName: optionalStringField(),
    email: optionalStringField(),
    specialization: z.array(z.string()).optional(),
    bio: nullableStringField(),
    role: UserRoleEnum.optional(),
    phoneNumber: nullableStringField(),
    address: nullableStringField(),
    avatar: nullableStringField(),
    pinnedProjects: z.array(z.string()).optional(),
    currency: optionalStringField(),
    taxId: nullableStringField(),
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
