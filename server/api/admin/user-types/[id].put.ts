import { z } from 'zod';
import { updateUserType } from '~/server/models/userType';

const UserTypeUpdatePayload = proxyZodError(
  z.object({
    name: z.string().optional()
  })
);

const UserTypeUpdateQuery = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const payload = UserTypeUpdatePayload.parse(await readBody(evt));
  const userTypeId = UserTypeUpdateQuery.parse(evt.context.params).id;
  const userType = await updateUserType(userTypeId, payload);
  return userType;
});
