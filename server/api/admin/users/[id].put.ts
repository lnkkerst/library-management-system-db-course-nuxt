import { z } from 'zod';
import { updateUser } from '~/server/models/user';

export const UserUpdatePayload = proxyZodError(
  z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    userTypeId: z.string().optional()
  })
);

export const UserUpdateParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const userId = UserUpdateParams.parse(evt.context.params).id;
  const payload = UserUpdatePayload.parse(await readBody(evt));
  return await updateUser(userId, payload);
});
