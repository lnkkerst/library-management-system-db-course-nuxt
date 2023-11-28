import { z } from 'zod';
import { deleteBookTypeById } from '~/server/models/bookType';

const BookTypeDeleteQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const bookTypeId = BookTypeDeleteQuery.parse(evt.context.params).id;

  try {
    return await deleteBookTypeById(bookTypeId);
  }
  catch (e) {
    throw createError({
      statusCode: 409,
      message: 'Foreign key conflicted'
    });
  }
});
