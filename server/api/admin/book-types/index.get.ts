import { getBookTypes } from '~/server/models/bookType';

export default defineEventHandler(async () => {
  const bookTypes = getBookTypes();
  return bookTypes;
});
