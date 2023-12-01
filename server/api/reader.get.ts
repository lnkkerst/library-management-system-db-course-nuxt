import { getReaderById } from '~/server/models/reader';
import { useReaderClaims } from '~/server/composables/auth';

export default defineEventHandler(async evt => {
  const readerClaims = useReaderClaims(evt);
  return await getReaderById(readerClaims.id);
});
