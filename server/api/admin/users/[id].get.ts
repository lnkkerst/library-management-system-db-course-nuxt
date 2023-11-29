import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { getUserById } from '~/server/models/user';

const UserGetQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const userId = UserGetQuery.parse(evt.context.params).id;

  return await getUserById(userId);
});
