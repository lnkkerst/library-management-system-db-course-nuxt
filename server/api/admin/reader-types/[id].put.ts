import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { updateReaderType } from '~/server/models/readerType';

const ReaderTypeUpdatePayload = proxyZodError(
  z.object({
    name: z.string().optional()
  })
);

const ReaderTypeUpdateQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = ReaderTypeUpdatePayload.parse(await readBody(evt));
  const readerTypeId = ReaderTypeUpdateQuery.parse(evt.context.params).id;
  const readerType = await updateReaderType(readerTypeId, payload);
  return readerType;
});
