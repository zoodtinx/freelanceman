import { z } from "zod";

export const optionalString = () =>
    z.string().transform(val => val === '' ? undefined : val).optional()