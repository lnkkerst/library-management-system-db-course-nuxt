import { useUserClaims } from '~/server/composables/auth';
import { getUserTypes } from '~/server/models/userType';

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const userTypes = getUserTypes();
  return userTypes;
});
