import { z } from 'zod';

export const createClientSchema = z.object({
    name: z.string().min(1),
    taxId: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    detail: z.string().optional(),
    themeColor: z.string().min(1),
});

export const editClientSchema = z.object({
    name: z.string().optional(),
    taxId: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    detail: z.string().optional(),
    themeColor: z.string().optional(),
  });

export const searchClientSchema = z.object({
    name: z.string().optional(),
    hasActiveProject: z.boolean().optional()
  });

  export type CreateClientDto = z.infer<typeof createClientSchema>;
  export type EditClientDto = z.infer<typeof editClientSchema>;
  export type SearchClientDto = z.infer<typeof searchClientSchema>;