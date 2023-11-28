import { z } from 'zod';
import { prisma } from '~/prisma/db';
import { useUserClaims } from '~/server/composables/auth';

const BookTypeGetPayload = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  useUserClaims(evt);
  const query = BookTypeGetPayload.parse(evt.context.params);
  const bookTypeId = query.id;
  const bookType
    = await prisma.$queryRaw`SELECT * FROM "Book" WHERE "id" = ${bookTypeId}`;
  if (!bookType) {
    throw createError({
      statusCode: 404,
      message: `Book with id ${bookTypeId} not found`
    });
  }
  return bookType;
});
