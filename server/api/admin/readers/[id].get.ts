import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { getReaderById } from '~/server/models/reader';

const ReaderGetParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const id = ReaderGetParams.parse(evt.context.params).id;
  return await getReaderById(id);
});
