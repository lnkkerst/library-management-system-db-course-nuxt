import { z } from 'zod';
import { prisma } from '~/prisma/db';
import { useUserClaims } from '~/server/composables/auth';

const BookGetPayload = proxyZodError(
  z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    isbn: z.string().optional(),
    author: z.string().optional()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  return await prisma.$queryRaw`SELECT * FROM "Book"`;
});
