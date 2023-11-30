import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { deleteBookById } from '~/server/models/book';

const BookDeleteParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const id = BookDeleteParams.parse(evt.context.params).id;
  return await deleteBookById(id);
});
