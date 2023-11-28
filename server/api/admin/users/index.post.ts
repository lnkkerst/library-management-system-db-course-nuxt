import { z } from 'zod';
import { createUser, getUserByName } from '~/server/models/user';

export const UserCreatePayload = proxyZodError(
  z.object({
    name: z.string(),
    password: z.string(),
    userTypeId: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = UserCreatePayload.parse(await readBody(evt));
  const hashedPassword = await hashPassword(payload.password);
  const dbUser = await getUserByName(payload.name);
  if (dbUser) {
    throw createError({
      statusCode: 409,
      message: `User with name ${payload.name} already exists`
    });
  }
  return await createUser({
    name: payload.name,
    hashedPassword,
    userTypeId: payload.userTypeId,
    permission: 'admin'
  });
});
