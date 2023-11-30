import { getReaderTypes } from '~/server/models/readerType';

export default defineEventHandler(async evt => {
  // useUserClaims(evt);
  const readerTypes = getReaderTypes();
  return readerTypes;
});
