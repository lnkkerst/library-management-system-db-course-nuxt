import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { deleteUserById } from '~/server/models/user';

const UserDeleteQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const userClaims = useUserClaims(evt);
  const userId = UserDeleteQuery.parse(evt.context.params).id;
  if (userId === userClaims.id) {
    throw createError({
      statusCode: 409,
      message: 'Cannot delete self'
    });
  }

  try {
    return await deleteUserById(userId);
  }
  catch (e) {
    throw createError({
      statusCode: 409,
      message: 'Foreign key conflicted'
    });
  }
});
