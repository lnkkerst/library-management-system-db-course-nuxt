import { z } from 'zod';
import { deleteUserById } from '~/server/models/user';

const UserDeleteQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const userId = UserDeleteQuery.parse(evt.context.params).id;

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
