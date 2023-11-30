import { ReaderClaimsZod, UserClaimsZod } from '~/server/models/auth';
import type { ReaderClaims, UserClaims } from '~/server/models/auth';

export const useUserClaims = defineEventHandler(evt => {
  const cookie = getCookie(evt, 'userAccessToken');
  const token = cookie?.trim().split(/\s+/).at(-1);
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'No authorization header'
    });
  }
  try {
    return decodeClaims<UserClaims>(token, UserClaimsZod);
  }
  catch {
    throw createError({
      statusCode: 401,
      message: 'Invalid authorization header'
    });
  }
});

export const useReaderClaims = defineEventHandler(evt => {
  const cookie = getCookie(evt, 'readerAccessToken');
  const token = cookie?.trim().split(/\s+/).at(-1);
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'No authorization header'
    });
  }
  try {
    return decodeClaims<ReaderClaims>(token, ReaderClaimsZod);
  }
  catch {
    throw createError({
      statusCode: 401,
      message: 'Invalid authorization header'
    });
  }
});
