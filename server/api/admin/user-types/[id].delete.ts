import { z } from 'zod';
import { deleteUserTypeById } from '~/server/models/userType';

const UserTypeDeleteQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const userTypeId = UserTypeDeleteQuery.parse(evt.context.params).id;

  try {
    return await deleteUserTypeById(userTypeId);
  }
  catch (e) {
    throw createError({
      statusCode: 409,
      message: 'Foreign key conflicted'
    });
  }
});
