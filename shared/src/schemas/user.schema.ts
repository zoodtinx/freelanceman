import { z } from 'zod';

export const userPayloadSchema = z.object({
  id: z.string().uuid(),
  isDemo: z.boolean().default(false),
  displayName: z.string().min(1),
  email: z.string().email(),
  password: z.string().nullable(),
  specialization: z.array(z.string()).min(1),
  bio: z.string().nullable(),
  role: z.string().default("user"),
  phoneNumber: z.string().nullable(),
  address: z.string().nullable(),
  avatar: z.string().nullable(),
  pinnedProjects: z.array(z.string()).min(0),
  currency: z.string().nullable(),
  quitting: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;
