import { getReaderTypes } from '~/server/models/readerType';

export default defineEventHandler(async () => {
  const readerTypes = getReaderTypes();
  return readerTypes;
});
