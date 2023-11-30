import { z } from 'zod';
import type { ReaderClaims } from '~/server/models/auth';
import { getReaderByName } from '~/server/models/reader';

const ReaderLoginPayload = proxyZodError(
  z.object({
    username: z.string(),
    password: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = ReaderLoginPayload.parse(await readBody(evt));
  const dbReader = await getReaderByName(payload.username);
  if (!dbReader) {
    throw createError({
      statusCode: 404,
      message: `Reader with name ${payload.username} not found`
    });
  }
  if (!(await comparePassword(payload.password, dbReader.hashedPassword))) {
    throw createError({
      statusCode: 400,
      message: `Incorrect username or password`
    });
  }
  const readerClaims: ReaderClaims = {
    id: dbReader.id,
    name: dbReader.name,
    readerTypeId: dbReader.readerTypeId
  };
  return {
    accessToken: signClaims(readerClaims),
    reader: dbReader
  };
});
