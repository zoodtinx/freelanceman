import { z } from 'zod';

const googleUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  picture: z.string().url(),
})


export type GoogleUserDto = z.infer<typeof googleUserSchema>;
