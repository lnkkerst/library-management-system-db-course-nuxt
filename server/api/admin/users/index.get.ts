import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { PaginationValidation } from '~/server/models';
import { getUsers } from '~/server/models/user';

export const UsersGetQuery = proxyZodError(
  z.object({
    name: z.string().optional(),
    userTypeId: z.string().optional(),
    ...PaginationValidation
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = UsersGetQuery.parse(await getQuery(evt));
  return await getUsers(payload);
});
