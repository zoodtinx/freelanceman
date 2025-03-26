import { z } from 'zod';

export const createPartnerContactSchema = z.object({
  name: z.string().min(1),
  companyId: z.string().min(1),
  role: z.string().min(1),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  detail: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const searchPartnerContactSchema = z.object({
  name: z.string().optional(),
  companyId: z.string().optional(),
  role: z.string().optional(),
});

export const updatePartnerContactSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  details: z.string().optional(),
  avatar: z.string().url().optional(),
});

export type CreatePartnerContactDto = z.infer<typeof createPartnerContactSchema>;
export type SearchPartnerContactDto = z.infer<typeof searchPartnerContactSchema>;
export type UpdatePartnerContactDto = z.infer<typeof updatePartnerContactSchema>;
