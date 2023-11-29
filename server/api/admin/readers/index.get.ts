import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { PaginationValidation } from '~/server/models';
import { getReaders } from '~/server/models/reader';

export const ReadersGetQuery = proxyZodError(
  z.object({
    name: z.string().optional(),
    libraryCardId: z.string().optional(),
    password: z.string().optional(),
    gender: z.string().optional(),
    readerTypeId: z.string().optional(),
    organization: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    note: z.string().optional(),
    ...PaginationValidation
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = ReadersGetQuery.parse(await getQuery(evt));
  return await getReaders(payload);
});
