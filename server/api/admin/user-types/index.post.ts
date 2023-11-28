import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { createUserType } from '~/server/models/userType';

const UserTypeCreatePayload = proxyZodError(
  z.object({
    name: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const payload = UserTypeCreatePayload.parse(await readBody(evt));
  const userType = await createUserType({ name: payload.name });
  return userType;
});
