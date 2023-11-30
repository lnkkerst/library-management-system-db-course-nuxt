import { z } from 'zod';
import { getBooks } from '~/server/models/book';
import { PaginationValidation } from '~/server/models';

const BooksGetPayload = proxyZodError(
  z.object({
    name: z.string().optional(),
    isbn: z.string().optional(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    publishAt: z
      .date()
      .or(z.string())
      .transform(v => new Date(v))
      .optional(),
    bookTypeId: z.string().optional(),
    indexNumber: z.string().optional(),
    price: z
      .number()
      .or(z.string())
      .transform(v => Number.parseFloat(v.toString()))
      .optional(),
    pages: z
      .number()
      .or(z.string())
      .transform(v => Number.parseInt(v.toString()))
      .optional(),
    summary: z.string().optional(),
    amount: z
      .number()
      .or(z.string())
      .transform(v => Number.parseInt(v.toString()))
      .optional(),
    ...PaginationValidation
  })
);

export default defineEventHandler(async evt => {
  // useUserClaims(evt);
  const payload = BooksGetPayload.parse(getQuery(evt));
  return await getBooks(payload);
});
