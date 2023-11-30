import { useReaderClaims } from '~/server/composables/auth';
import { getBookingRecordsByReaderId } from '~/server/models/bookingRecord';

export default defineEventHandler(async evt => {
  const readerId = useReaderClaims(evt).id;
  return await getBookingRecordsByReaderId(readerId);
});
