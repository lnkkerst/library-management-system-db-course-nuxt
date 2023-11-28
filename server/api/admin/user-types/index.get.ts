import { getUserTypes } from '~/server/models/userType';

export default defineEventHandler(async () => {
  const userTypes = getUserTypes();
  return userTypes;
});
