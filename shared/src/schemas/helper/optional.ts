import { z } from 'zod';

export const optionalString = () =>
    z
        .preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().optional()
        )
        .nullable();

export const optionalNumber = () =>
    z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.number().optional()
    );
