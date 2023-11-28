import { useUserClaims } from '~/server/composables/auth';
import { getUserById } from '~/server/models/user';

export default defineEventHandler(async evt => {
  const userClaims = useUserClaims(evt);
  return getUserById(userClaims.id);
});
