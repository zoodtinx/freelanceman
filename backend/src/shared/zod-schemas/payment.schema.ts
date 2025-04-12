import { z } from 'zod';

export const searchPaymentSchema = z.object({
    projectId: z.string().optional(),
});
