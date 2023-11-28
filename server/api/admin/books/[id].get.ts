import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { getBookById } from '~/server/models/book';

const BookGetPayload = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const query = BookGetPayload.parse(evt.context.params);
  const bookId = query.id;
  const book = getBookById(bookId);
  if (!book) {
    throw createError({
      statusCode: 404,
      message: `Book with id ${bookId} not found`
    });
  }
  return book;
});
