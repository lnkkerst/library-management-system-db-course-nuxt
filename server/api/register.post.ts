import { z } from 'zod';
import { createReader, getReaderByName } from '../models/reader';
import type { ReaderClaims } from '~/server/models/auth';
import { getDefaultReaderType } from '~/server/models/auth';
import { proxyZodError } from '~/server/utils/error';

const ReaderRegisterPayload = proxyZodError(
  z.object({
    username: z.string(),
    password: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = ReaderRegisterPayload.parse(await readBody(evt));
  const dbReader = await getReaderByName(payload.username);
  if (dbReader) {
    throw createError({
      statusCode: 409,
      message: `Reader with name ${payload.username} already exists`
    });
  }
  const hashedPassword = await hashPassword(payload.password);
  const reader = await createReader({
    name: payload.username,
    readerTypeId: (await getDefaultReaderType()).id,
    hashedPassword,
    gender: '保密',
    libraryCardId: false,
    email: '',
    note: '',
    organization: '',
    phoneNumber: ''
  });
  if (!reader) {
    throw createError({ statusCode: 500, message: 'Failed to create reader' });
  }
  const readerClaims: ReaderClaims = {
    id: reader.id,
    name: reader.name,
    readerTypeId: reader.readerTypeId
  };
  return { accessToken: signClaims(readerClaims), reader };
});
