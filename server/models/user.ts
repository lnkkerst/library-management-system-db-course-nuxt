import type { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '~/prisma/db';
import type { UsersGetQuery } from '~/server/api/admin/users/index.get';

type UsersGetOptions = ReturnType<(typeof UsersGetQuery)['parse']>;

export async function getUsers(opts: UsersGetOptions) {
  const sqlParts = [];
  const sqlValues: any[] = [];

  if (opts.userTypeId) {
    sqlParts.push(`userTypeId = @P${sqlParts.length + 1}`);
    sqlValues.push(opts.userTypeId);
  }

  if (opts.name) {
    sqlParts.push(`name LIKE @P${sqlParts.length + 1}`);
    sqlValues.push(`%${opts.name}%`);
  }

  const whereQuery
    = sqlParts.length > 0 ? `WHERE ${sqlParts.join(' AND ')}` : '';
  const sqlQuery = `
    SELECT * FROM "User"
    ${whereQuery}
    ORDER BY id
    OFFSET @P${sqlParts.length + 1} ROWS FETCH NEXT @P${
      sqlParts.length + 2
    } ROWS ONLY;
  `;

  const finalValues = [...sqlValues, opts.offset, opts.limit];

  const countQuery = `
    SELECT COUNT(*) FROM "User"
    ${whereQuery}
  `;

  const [users, [{ '': totalCount }]] = await Promise.all([
    prisma.$queryRawUnsafe<User[]>(sqlQuery, ...finalValues),
    prisma.$queryRawUnsafe<any>(countQuery, ...finalValues)
  ]);

  return { data: users, totalCount: totalCount as number };
}

export async function getUserByName(name: string) {
  const dbUser = await prisma.$queryRaw<
    User[]
  >`SELECT * FROM "User" WHERE "name" = ${name}`;
  return dbUser.at(0);
}

export async function getUserById(id: string) {
  const dbUser = await prisma.$queryRaw<
    User[]
  >`SELECT * FROM "User" WHERE "id" = ${id}`;
  return dbUser.at(0);
}

export interface userCreateOptions {
  name: string
  hashedPassword: string
  permission: string
  userTypeId: string
}

export async function createUser({
  name,
  hashedPassword,
  permission,
  userTypeId
}: userCreateOptions) {
  const user = await prisma.$queryRaw<User[]>`
  INSERT INTO "User" ("id", "name", "hashedPassword", "permission", "userTypeId")
  OUTPUT INSERTED.*
  VALUES (${uuidv4()}, ${name}, ${hashedPassword}, ${permission}, ${userTypeId});
`;
  return user.at(0);
}

export async function deleteUserById(id: string) {
  const user = await prisma.$queryRaw<User[]>`
    DELETE FROM "User"
    OUTPUT DELETED.*
    WHERE id = ${id}
  `;
  return user.at(0);
}

export interface userUpdateOptions {
  name?: string
  password?: string
  userTypeId?: string
}

export async function updateUser(id: string, opts: userUpdateOptions) {
  const sqlParts = [];
  const sqlValues = [];

  if (opts.name) {
    sqlParts.push(`name = @P${sqlParts.length + 1}`);
    sqlValues.push(opts.name);
  }

  if (opts.password) {
    sqlParts.push(`hashedPassword = @P${sqlParts.length + 1}`);
    sqlValues.push(await hashPassword(opts.password));
  }

  if (opts.userTypeId) {
    sqlParts.push(`userTypeId = @P${sqlParts.length + 1}`);
    sqlValues.push(opts.userTypeId);
  }

  const sqlQuery = `
    UPDATE "User" SET ${sqlParts.join(', ')}
    OUTPUT INSERTED.*
    WHERE id = @P${sqlParts.length + 1}
  `;

  const finalValues = [...sqlValues, id];

  const user = await prisma.$queryRawUnsafe(sqlQuery, ...finalValues);
  return user;
}
