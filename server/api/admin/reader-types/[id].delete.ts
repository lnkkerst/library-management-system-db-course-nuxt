import { z } from 'zod';
import { deleteReaderTypeById } from '~/server/models/readerType';

const ReaderTypeDeleteQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const readerTypeId = ReaderTypeDeleteQuery.parse(evt.context.params).id;

  try {
    return await deleteReaderTypeById(readerTypeId);
  }
  catch (e) {
    throw createError({
      statusCode: 409,
      message: 'Foreign key conflicted'
    });
  }
});
