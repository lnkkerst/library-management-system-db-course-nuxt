import type { UserType } from '@prisma/client';
import { v4 } from 'uuid';
import { prisma } from '~/prisma/db';

export async function getUserTypes() {
  const userTypes = await prisma.$queryRaw<UserType[]>`
    SELECT * FROM UserType;
  `;
  return userTypes;
}

export async function getUserTypeById(id: string) {
  const userType = await prisma.$queryRaw<
    UserType[]
  >`SELECT * FROM UserType WHERE id = ${id}`;
  return userType.at(0);
}

export async function getUserTypesByName(name: string) {
  const userTypes = await prisma.$queryRaw<
    UserType[]
  >`SELECT * FROM UserType WHERE name = ${name}`;
  return userTypes;
}

export async function deleteUserTypeById(id: string) {
  const userType = await prisma.$queryRaw<UserType[]>`
    DELETE FROM UserType
    OUTPUT DELETED.*
    WHERE id = ${id}
  `;
  return userType.at(0);
}

export type UserTypeCreateOptions = Omit<UserType, 'id'>;

export async function createUserType({ name }: UserTypeCreateOptions) {
  const userType = await prisma.$queryRaw<UserType[]>`
    INSERT INTO "UserType" ("id", "name")
    OUTPUT INSERTED.*
    VALUES (${v4()}, ${name});
`;
  return userType.at(0);
}

export type UserTypeUpdateOptions = Partial<UserTypeCreateOptions>;

export async function updateUserType(
  id: string,
  userType: UserTypeUpdateOptions
) {
  const sqlParts = [];
  const sqlValues = [];
  for (const [i, x] of ['name'].entries() as IterableIterator<
    [number, keyof UserTypeUpdateOptions]
  >) {
    if (userType[x as keyof UserTypeUpdateOptions]) {
      sqlParts.push(`${x} = @P${i + 1}`);
      sqlValues.push(userType[x]);
    }
  }

  const sqlQuery = `
    UPDATE UserType SET ${sqlParts.join(', ')}
    OUTPUT INSERTED.*
    WHERE id = @P${sqlParts.length + 1}
`;
  const finalSqlValues = [...sqlValues, id];
  const dbUserType = await prisma.$queryRawUnsafe<UserType[]>(
    sqlQuery,
    ...finalSqlValues
  );
  return dbUserType.at(0);
}
