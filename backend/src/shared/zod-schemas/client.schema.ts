import { z } from 'zod';

export const createClientSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
});

export const updateClientSchema = createClientSchema
    .partial()
    .extend({ id: z.string().uuid('Invalid ID format') });


export const findManyClientSchema = z.object({
    name: z.string().optional(),
    hasActiveProject: z.boolean().optional(),
});

export const findOneClientSchema = z.string().min(4)

export const deleteOneClientSchema = z.string().min(4)

