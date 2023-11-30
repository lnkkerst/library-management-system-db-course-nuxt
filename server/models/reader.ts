import type { Reader } from '@prisma/client';
import { v4 } from 'uuid';
import type { ReadersGetQuery } from '../api/admin/readers/index.get';
import type { ReaderCreatePayload } from '../api/admin/readers/index.post';
import type { ReaderUpdatePayload } from '../api/admin/readers/[id].put';
import { prisma } from '~/prisma/db';

type ReadersGetOptions = ReturnType<(typeof ReadersGetQuery)['parse']>;
export async function getReaders(opts: ReadersGetOptions) {
  const sqlParts = [];
  const sqlValues: any[] = [];

  for (const x of [
    'name',
    'libraryCardId',
    'gender',
    'readerTypeId',
    'organization',
    'phoneNumber',
    'email',
    'note'
  ]) {
    if ((opts as any)[x]) {
      sqlParts.push(`${x} LIKE @P${sqlParts.length + 1}`);
      sqlValues.push(`%${(opts as any)[x]}%`);
    }
  }

  const whereQuery
    = sqlParts.length > 0 ? `WHERE ${sqlParts.join(' AND ')}` : '';
  const sqlQuery = `
    SELECT * FROM "Reader"
    ${whereQuery}
    ORDER BY id
    OFFSET @P${sqlParts.length + 1} ROWS FETCH NEXT @P${
      sqlParts.length + 2
    } ROWS ONLY;
  `;

  const finalValues = [...sqlValues, opts.offset, opts.limit];

  const countQuery = `
    SELECT COUNT(*) FROM "Reader"
    ${whereQuery}
  `;

  const [readers, [{ '': totalCount }]] = await Promise.all([
    prisma.$queryRawUnsafe<Reader[]>(sqlQuery, ...finalValues),
    prisma.$queryRawUnsafe<any>(countQuery, ...finalValues)
  ]);

  return { data: readers, totalCount: totalCount as number };
}

export async function getReaderById(id: string) {
  const reader = await prisma.$queryRaw<
    Reader[]
  >`SELECT * FROM "Reader" WHERE "id" = ${id}`;
  return reader.at(0);
}

export async function getReaderByName(name: string) {
  const dbReader = await prisma.$queryRaw<
    Reader[]
  >`SELECT * FROM "Reader" WHERE "name" = ${name}`;
  return dbReader.at(0);
}

export async function deleteReaderById(id: string) {
  const reader = await prisma.$queryRaw<Reader[]>`
    DELETE FROM "Reader"
    OUTPUT DELETED.*
    WHERE id = ${id}
  `;
  return reader.at(0);
}

type ReaderCreateOptions = Omit<
  ReturnType<(typeof ReaderCreatePayload)['parse']>,
  'password' | 'libraryCardId'
> & { hashedPassword: string; libraryCardId: boolean };

export async function createReader(opts: ReaderCreateOptions) {
  const {
    name,
    hashedPassword,
    gender,
    readerTypeId,
    libraryCardId,
    organization,
    phoneNumber,
    email,
    note
  } = opts;

  const result = await prisma.$queryRaw<Reader[]>`
    INSERT INTO "Reader" (
      "id",
      "name",
      "hashedPassword",
      "gender",
      "readerTypeId",
      "libraryCardId",
      "organization",
      "phoneNumber",
      "email",
      "note",
      "registerAt"
    )
    OUTPUT INSERTED.*
    VALUES (
      ${v4()},
      ${name},
      ${hashedPassword},
      ${gender},
      ${readerTypeId},
      ${libraryCardId ? v4() : ''},
      ${organization || ''},
      ${phoneNumber || ''},
      ${email || ''},
      ${note || ''},
      ${new Date()}
    );
  `;

  return result.at(0);
}

type ReaderUpdateOptions = Omit<
  ReturnType<(typeof ReaderUpdatePayload)['parse']>,
  'password'
> & { hashedPassword?: string };

export async function updateReader(id: string, opts: ReaderUpdateOptions) {
  const sqlParts = [];
  const sqlValues = [];

  for (const x of [
    'name',
    'libraryCardId',
    'gender',
    'readerTypeId',
    'organization',
    'phoneNumber',
    'email',
    'note',
    'hashedPassword'
  ]) {
    if ((opts as any)[x]) {
      sqlParts.push(`${x} = @P${sqlParts.length + 1}`);
      sqlValues.push(`${(opts as any)[x]}`);
    }
  }

  if (!sqlParts.length) {
    return await getReaderById(id);
  }

  const sqlQuery = `
    UPDATE "Reader" SET ${sqlParts.join(', ')}
    OUTPUT INSERTED.*
    WHERE id = @P${sqlParts.length + 1}
  `;

  const finalValues = [...sqlValues, id];

  const reader = await prisma.$queryRawUnsafe(sqlQuery, ...finalValues);
  return reader;
}
