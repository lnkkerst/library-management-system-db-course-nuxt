import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { updateBook } from '~/server/models/book';

const BookUpdatePayload = proxyZodError(
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
      .optional()
  })
);

const BookUpdateParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = BookUpdatePayload.parse(await readBody(evt));
  const id = BookUpdateParams.parse(evt.context.params).id;
  return await updateBook(id, payload);
});
