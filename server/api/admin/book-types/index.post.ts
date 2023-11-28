import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { createBookType } from '~/server/models/bookType';

const BookTypeCreatePayload = proxyZodError(
  z.object({
    name: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = BookTypeCreatePayload.parse(await readBody(evt));
  const bookType = await createBookType({ name: payload.name });
  return bookType;
});
