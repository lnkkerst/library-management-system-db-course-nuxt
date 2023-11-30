import { z } from 'zod';
import { useReaderClaims } from '~/server/composables/auth';
import { createBookingRecord } from '~/server/models/bookingRecord';

const BookingRecordCreateParams = proxyZodError(
  z.object({
    id: z.string()
  })
);

export default defineEventHandler(async evt => {
  const readerId = useReaderClaims(evt).id;
  const bookId = BookingRecordCreateParams.parse(evt.context.params).id;
  return await createBookingRecord({ readerId, bookId });
});
