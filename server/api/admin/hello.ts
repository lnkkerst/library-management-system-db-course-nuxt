import { useUserClaims } from '~/server/composables/auth';

export default defineEventHandler(evt => {
  const user = useUserClaims(evt);
  return user;
});
