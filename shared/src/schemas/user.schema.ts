import { z } from 'zod';
import { optionalString } from './helper/optional';

export const userPayloadSchema = z.object({
  id: z.string().uuid(),
  isDemo: z.boolean().default(false),
  name: z.string().min(1),
  displayName: z.string().min(1),
  email: z.string().email(),
  password: optionalString(),
  specialization: z.array(z.string()).min(1),
  bio: optionalString(),
  taxId: optionalString(),
  role: z.string().default("user"),
  phoneNumber: optionalString(),
  address: optionalString(),
  avatar: optionalString(),
  pinnedProjects: z.array(z.string()).min(0),
  currency: optionalString(),
  quitting: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const editUserProfileSchema = z.object({
  name: optionalString(),
  displayName: optionalString(),
  email: optionalString(),
  specialization: z.array(z.string()).optional(),
  bio: optionalString(),
  taxId: optionalString(),
  phoneNumber: optionalString(),
  address: optionalString(),
  avatar: optionalString(),
  pinnedProjects: z.array(z.string()).optional(),
  currency: optionalString(),
  quitting: z.boolean().optional(),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;
export type EditUserDto = z.infer<typeof editUserProfileSchema>;