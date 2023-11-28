import { z } from 'zod';
import type { UserClaims } from '~/server/models/auth';
import { getDefaultAdminUserType } from '~/server/models/auth';
import { createUser, getUserByName } from '~/server/models/user';
import { proxyZodError } from '~/server/utils/error';

const UserRegisterPayload = proxyZodError(
  z.object({
    username: z.string(),
    password: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = UserRegisterPayload.parse(await readBody(evt));
  const dbUser = await getUserByName(payload.username);
  if (dbUser) {
    throw createError({
      statusCode: 409,
      message: `User with name ${payload.username} already exists`
    });
  }
  const hashedPassword = await hashPassword(payload.password);
  const user = await createUser({
    name: payload.username,
    hashedPassword,
    permission: 'admin',
    userTypeId: (await getDefaultAdminUserType()).id
  });
  if (!user) {
    throw createError({ statusCode: 500, message: 'Failed to create user' });
  }
  const userClaims: UserClaims = {
    id: user.id,
    permission: user.permission,
    name: user.name
  };
  return { accessToken: signClaims(userClaims), user };
});
