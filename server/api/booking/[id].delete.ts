import { z } from 'zod';
import { useReaderClaims } from '~/server/composables/auth';
import {
  deleteBookingRecordById,
  getBookingRecordById
} from '~/server/models/bookingRecord';

const BookingRecordDeleteParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const readerId = useReaderClaims(evt).id;
  const recordId = BookingRecordDeleteParams.parse(evt.context.params).id;
  const dbRecord = await getBookingRecordById(recordId);
  if (!dbRecord) {
    throw createError({
      statusCode: 404
    });
  }
  if (dbRecord.readerId !== readerId) {
    throw createError({
      statusCode: 409
    });
  }
  return await deleteBookingRecordById(recordId);
});
