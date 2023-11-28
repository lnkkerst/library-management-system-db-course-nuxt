import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { updateBookType } from '~/server/models/bookType';

const BookTypeUpdatePayload = proxyZodError(
  z.object({
    name: z.string().optional()
  })
);

const BookTypeUpdateQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = BookTypeUpdatePayload.parse(await readBody(evt));
  const bookTypeId = BookTypeUpdateQuery.parse(evt.context.params).id;
  const bookType = await updateBookType(bookTypeId, payload);
  return bookType;
});
