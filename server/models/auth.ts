import type { UserType } from '@prisma/client';
import { createUserType, getUserTypesByName } from './userType';

export interface UserClaims {
  id: string
  name: string
  permission: string
  exp?: number
}

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
