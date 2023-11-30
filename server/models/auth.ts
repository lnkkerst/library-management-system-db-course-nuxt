import type { UserType } from '@prisma/client';
import { z } from 'zod';
import { createUserType, getUserTypesByName } from './userType';
import { createReaderType, getReaderTypesByName } from './readerType';

export interface UserClaims {
  id: string
  name: string
  permission: string
  exp?: number
}

export const UserClaimsZod = proxyZodError(
  z.object({
    id: z.string(),
    name: z.string(),
    permission: z.string(),
    exp: z.number().optional()
  })
);

let defaultAdminUserType: UserType;

export async function getDefaultAdminUserType() {
  if (defaultAdminUserType) {
    return defaultAdminUserType;
  }
  let dbType = (await getUserTypesByName('admin')).at(0);
  if (dbType) {
    defaultAdminUserType = dbType;
    return defaultAdminUserType;
  }
  dbType = await createUserType({ name: 'admin' });
  if (!dbType) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create default admin user type'
    });
  }
  defaultAdminUserType = dbType;
  return defaultAdminUserType;
}

export interface ReaderClaims {
  id: string
  name: string
  readerTypeId: string
  exp?: number
}

export const ReaderClaimsZod = proxyZodError(
  z.object({
    id: z.string(),
    name: z.string(),
    readerTypeId: z.string(),
    exp: z.number().optional()
  })
);

let defaultReaderType: UserType;

export async function getDefaultReaderType() {
  if (defaultReaderType) {
    return defaultReaderType;
  }
  let dbType = (await getReaderTypesByName('default')).at(0);
  if (dbType) {
    defaultReaderType = dbType;
    return defaultReaderType;
  }
  dbType = await createReaderType({ name: 'default' });
  if (!dbType) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create default reader type'
    });
  }
  defaultReaderType = dbType;
  return defaultReaderType;
}
