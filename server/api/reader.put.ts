import { z } from 'zod';
import { useReaderClaims } from '~/server/composables/auth';
import { updateReader } from '~/server/models/reader';

export const ReaderUpdatePayload = proxyZodError(
  z.object({
    password: z.string().optional(),
    name: z.string(),
    gender: z.string(),
    organization: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    note: z.string().optional()
  })
);

export default defineEventHandler(async evt => {
  const readerClaims = useReaderClaims(evt);
  const readerId = readerClaims.id;
  const payload = ReaderUpdatePayload.parse(await readBody(evt));
  let newPassword;
  if (payload.password) {
    newPassword = await hashPassword(payload.password);
  }
  return await updateReader(readerId, {
    ...payload,
    hashedPassword: newPassword
  });
});
