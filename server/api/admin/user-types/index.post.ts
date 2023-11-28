import { z } from 'zod';
import { createUserType } from '~/server/models/userType';

const UserTypeCreatePayload = proxyZodError(
  z.object({
    name: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = UserTypeCreatePayload.parse(await readBody(evt));
  const userType = await createUserType({ name: payload.name });
  return userType;
});
