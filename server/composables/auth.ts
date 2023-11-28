import type { UserClaims } from '~/server/models/auth';

export const useUserClaims = defineEventHandler(evt => {
  const header = getHeader(evt, 'Authorization');
  const token = header?.trim().split(/\s+/).at(-1);
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'No authorization header'
    });
  }
  try {
    return decodeClaims<UserClaims>(token);
  }
  catch {
    throw createError({
      statusCode: 401,
      message: 'Invalid authorization header'
    });
  }
});
