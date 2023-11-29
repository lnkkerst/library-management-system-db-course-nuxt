import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';

export const ReaderCreatePayload = proxyZodError(
  z.object({
    libraryCardId: z.string().optional(),
    password: z.string(),
    name: z.string(),
    gender: z.string(),
    readerTypeId: z.string(),
    organization: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    note: z.string().optional()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = ReaderCreatePayload.parse(await readBody(evt));
  return await createReader(payload);
});
