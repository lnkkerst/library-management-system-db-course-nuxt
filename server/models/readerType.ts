import type { ReaderType } from '@prisma/client';
import { v4 } from 'uuid';
import { prisma } from '~/prisma/db';

export async function getReaderTypes() {
  const readerTypes = await prisma.$queryRaw<ReaderType[]>`
    SELECT * FROM ReaderType;
  `;
  return readerTypes;
}

export async function getReaderTypeById(id: string) {
  const readerType = await prisma.$queryRaw<ReaderType[]>`
    SELECT * FROM ReaderType WHERE id = ${id};
  `;
  return readerType.at(0);
}

export async function getReaderTypesByName(name: string) {
  const readerTypes = await prisma.$queryRaw<ReaderType[]>`
    SELECT * FROM ReaderType WHERE name = ${name};
  `;
  return readerTypes;
}

export async function deleteReaderTypeById(id: string) {
  const readerType = await prisma.$queryRaw<ReaderType[]>`
    DELETE FROM ReaderType
    OUTPUT DELETED.*
    WHERE id = ${id}
  `;
  return readerType.at(0);
}

export interface ReaderTypeCreateOptions {
  name: string
}

export async function createReaderType({ name }: ReaderTypeCreateOptions) {
  const readerType = await prisma.$queryRaw<ReaderType[]>`
    INSERT INTO "ReaderType" ("id", "name")
    OUTPUT INSERTED.*
    VALUES (${v4()}, ${name});
  `;
  return readerType.at(0);
}

export type ReaderTypeUpdateOptions = Partial<ReaderTypeCreateOptions>;

export async function updateReaderType(
  id: string,
  readerType: ReaderTypeUpdateOptions
) {
  const sqlParts = [];
  const sqlValues = [];
  for (const [i, x] of ['name'].entries() as IterableIterator<
    [number, keyof ReaderTypeUpdateOptions]
  >) {
    if (readerType[x as keyof ReaderTypeUpdateOptions]) {
      sqlParts.push(`${x} = @P${i + 1}`);
      sqlValues.push(readerType[x]);
    }
  }
  const sqlQuery = `
    UPDATE ReaderType SET ${sqlParts.join(', ')}
    OUTPUT INSERTED.*
    WHERE id = @P${sqlParts.length + 1}
  `;
  const finalSqlValues = [...sqlValues, id];
  const dbReaderType = await prisma.$queryRawUnsafe<ReaderType[]>(
    sqlQuery,
    ...finalSqlValues
  );
  return dbReaderType.at(0);
}
