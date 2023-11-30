import { useUserClaims } from '~/server/composables/auth';
import { getBookTypes } from '~/server/models/bookType';

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const bookTypes = getBookTypes();
  return bookTypes;
});
