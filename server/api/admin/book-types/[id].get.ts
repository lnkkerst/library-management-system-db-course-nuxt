import { z } from 'zod';
import { getBookTypeById } from '~/server/models/bookType';

const BookTypeGetPayload = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  // useUserClaims(evt);
  const bookTypeId = BookTypeGetPayload.parse(evt.context.params).id;
  return await getBookTypeById(bookTypeId);
});
