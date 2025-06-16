import { z } from 'zod';
import { optionalString, nullableOptionalString } from './helper/optional';

export const visitingStatusSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  homePage: z.boolean().default(false),
  actionsPage: z.boolean().default(false),
  allClientsPage: z.boolean().default(false),
  partnersPage: z.boolean().default(false),
  incomePage: z.boolean().default(false),
  filesPage: z.boolean().default(false),
  projectPage: z.boolean().default(false),
  documentBuilderPage: z.boolean().default(false),
});

export const userPayloadSchema = z.object({
  id: z.string().uuid(),
  isDemo: z.boolean().default(false),
  isFirstTimeVisitor: z.boolean().default(false),
  displayName: z.string().min(1),
  email: z.string().email(),
  password: optionalString(),
  specialization: z.array(z.string()).min(1),
  bio: optionalString(),
  role: z.string().default("user"),
  phoneNumber: optionalString(),
  address: optionalString(),
  avatar: optionalString(),
  pinnedProjects: z.array(z.string()).min(0),
  currency: optionalString(),
  taxId: optionalString(),
  quitting: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  visitingStatus: visitingStatusSchema.optional(),
});

export const editUserProfileSchema = z.object({
  name: optionalString(),
  displayName: optionalString(),
  email: optionalString(),
  specialization: z.array(z.string()).optional(),
  bio: nullableOptionalString(),
  taxId: nullableOptionalString(),
  phoneNumber: nullableOptionalString(),
  address: nullableOptionalString(),
  avatar: optionalString(),
  pinnedProjects: z.array(z.string()).optional(),
  currency: optionalString(),
  quitting: z.boolean().optional(),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;
export type EditUserDto = z.infer<typeof editUserProfileSchema>;