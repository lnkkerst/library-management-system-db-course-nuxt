import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { createReader } from '~/server/models/reader';

export const ReaderCreatePayload = proxyZodError(
  z.object({
    libraryCardId: z.boolean(),
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
  const hashedPassword = await hashPassword(payload.password);
  return await createReader({ ...payload, hashedPassword });
});
