import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { createReaderType } from '~/server/models/readerType';

const ReaderTypeCreatePayload = proxyZodError(
  z.object({
    name: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = ReaderTypeCreatePayload.parse(await readBody(evt));
  const readerType = await createReaderType({ name: payload.name });
  return readerType;
});
