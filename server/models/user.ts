import type { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '~/prisma/db';

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

export interface createUserOptions {
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
}: createUserOptions) {
  const user = await prisma.$queryRaw<User[]>`
  INSERT INTO "User" ("id", "name", "hashedPassword", "permission", "userTypeId")
  OUTPUT INSERTED.*
  VALUES (${uuidv4()}, ${name}, ${hashedPassword}, ${permission}, ${userTypeId});
`;
  return user.at(0);
}
