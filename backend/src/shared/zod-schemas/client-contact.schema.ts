import { z } from 'zod';

export const createClientContactSchema = z.object({
    name: z.string().min(1),
    companyId: z.string().min(1),
    role: z.string().optional(),
    phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
    detail: z.string().optional(),
    avatar: z.string().url().optional(),
});

export const searchClientContactSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    companyId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
});

export const updateClientContactSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  details: z.string().optional(),
  avatar: z.string().url().optional(),
});

export type CreateClientContactDto = z.infer<typeof createClientContactSchema>;
export type SearchClientContactDto = z.infer<typeof searchClientContactSchema>;
export type UpdateClientContactDto = z.infer<typeof updateClientContactSchema>;






