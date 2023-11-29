import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { deleteReaderById } from '~/server/models/reader';

const ReaderDeleteParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const readerId = ReaderDeleteParams.parse(evt.context.params).id;
  return await deleteReaderById(readerId);
});
