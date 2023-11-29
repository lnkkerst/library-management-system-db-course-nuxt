import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { updateReader } from '~/server/models/reader';

export const ReaderUpdatePayload = proxyZodError(
  z.object({
    libraryCardId: z.string().optional(),
    password: z.string().optional(),
    name: z.string(),
    gender: z.string(),
    readerTypeId: z.string(),
    organization: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    note: z.string().optional()
  })
);

const ReaderUpdateParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const readerId = ReaderUpdateParams.parse(evt.context.params).id;
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
