import { z } from 'zod';
import { getReaderTypeById } from '~/server/models/readerType';

const ReaderTypeGetPayload = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  // useUserClaims(evt);
  const readerTypeId = ReaderTypeGetPayload.parse(evt.context.params).id;
  return await getReaderTypeById(readerTypeId);
});
