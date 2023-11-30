import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { createBook } from '~/server/models/book';

const BookCreatePayload = proxyZodError(
  z.object({
    name: z.string(),
    isbn: z.string(),
    author: z.string(),
    publisher: z.string(),
    publishAt: z
      .date()
      .or(z.string())
      .transform(v => new Date(v)),
    bookTypeId: z.string(),
    indexNumber: z.string(),
    price: z
      .number()
      .or(z.string())
      .transform(v => Number.parseFloat(v.toString())),
    pages: z
      .number()
      .or(z.string())
      .transform(v => Number.parseInt(v.toString())),
    summary: z.string(),
    amount: z
      .number()
      .or(z.string())
      .transform(v => Number.parseInt(v.toString()))
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = BookCreatePayload.parse(await readBody(evt));
  return await createBook(payload);
});
