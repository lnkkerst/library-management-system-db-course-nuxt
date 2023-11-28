import type { BookType } from '@prisma/client';
import { v4 } from 'uuid';
import { prisma } from '~/prisma/db';

export async function getBookTypes() {
  const bookTypes = await prisma.$queryRaw<BookType[]>`
    SELECT * FROM BookType;
  `;
  return bookTypes;
}

export async function getBookTypeById(id: string) {
  const bookType = await prisma.$queryRaw<
    BookType[]
  >`SELECT * FROM BookType WHERE id = ${id}`;
  return bookType.at(0);
}

export async function getBookTypesByName(name: string) {
  const bookTypes = await prisma.$queryRaw<
    BookType[]
  >`SELECT * FROM BookType WHERE name = ${name}`;
  return bookTypes;
}

export async function deleteBookTypeById(id: string) {
  const bookType = await prisma.$queryRaw<BookType[]>`
    DELETE FROM BookType
    OUTPUT DELETED.*
    WHERE id = ${id}
  `;
  return bookType.at(0);
}

export type BookTypeCreateOptions = Omit<BookType, 'id'>;

export async function createBookType({ name }: BookTypeCreateOptions) {
  const bookType = await prisma.$queryRaw<BookType[]>`
    INSERT INTO "BookType" ("id", "name")
    OUTPUT INSERTED.*
    VALUES (${v4()}, ${name});
`;
  return bookType.at(0);
}

export type BookTypeUpdateOptions = Partial<BookTypeCreateOptions>;

export async function updateBookType(
  id: string,
  bookType: BookTypeUpdateOptions
) {
  const sqlParts = [];
  const sqlValues = [];
  for (const [i, x] of ['name'].entries() as IterableIterator<
    [number, keyof BookTypeUpdateOptions]
  >) {
    if (bookType[x as keyof BookTypeUpdateOptions]) {
      sqlParts.push(`${x} = @P${i + 1}`);
      sqlValues.push(bookType[x]);
    }
  }
  const sqlQuery = `
    UPDATE BookType SET ${sqlParts.join(', ')}
    OUTPUT INSERTED.*
    WHERE id = @P${sqlParts.length + 1}
`;
  const finalSqlValues = [...sqlValues, id];
  const dbBookType = await prisma.$queryRawUnsafe<BookType[]>(
    sqlQuery,
    ...finalSqlValues
  );
  return dbBookType.at(0);
}
