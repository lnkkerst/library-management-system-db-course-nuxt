import { z } from 'zod';

export const PaginationValidation = {
  offset: z
    .number()
    .or(z.string())
    .default(0)
    .transform(val => Number.parseInt(val)),
  limit: z
    .number()
    .or(z.string())
    .default(20)
    .transform(val => Number.parseInt(val))
};
