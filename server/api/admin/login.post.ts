import { z } from 'zod';
import type { UserClaims } from '~/server/models/auth';
import { getUserByName } from '~/server/models/user';

const UserLoginPayload = proxyZodError(
  z.object({
    username: z.string(),
    password: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = UserLoginPayload.parse(await readBody(evt));
  const dbUser = await getUserByName(payload.username);
  if (!dbUser) {
    throw createError({
      statusCode: 404,
      message: `User with name ${payload.username} not found`
    });
  }
  if (!comparePassword(payload.password, dbUser.hashedPassword)) {
    throw createError({
      statusCode: 400,
      message: `Incorrect username or password`
    });
  }
  const userClaims: UserClaims = {
    id: dbUser.id,
    name: dbUser.name,
    permission: dbUser.permission
  };
  return {
    accessToken: signClaims(userClaims),
    user: dbUser
  };
});
