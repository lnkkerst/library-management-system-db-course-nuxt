import { z } from 'zod';
import { useUserClaims } from '~/server/composables/auth';
import { getUserTypeById } from '~/server/models/userType';

const UserTypeGetPayload = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const userTypeId = UserTypeGetPayload.parse(evt.context.params).id;
  return await getUserTypeById(userTypeId);
});
