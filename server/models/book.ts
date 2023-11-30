import type { Book } from '@prisma/client';
import { v4 } from 'uuid';
import { prisma } from '~/prisma/db';

export type BooksGetOptions = Partial<Omit<Book, 'id'>> & {
  offset: number
  limit: number
};

export async function getBooks(options: BooksGetOptions) {
  const sqlParts = [];
  const sqlValues: any[] = [];

  for (const x of [
    'name',
    'isbn',
    'author',
    'publisher',
    'publishAt',
    'bookTypeId',
    'indexNumber',
    'price',
    'pages',
    'summary',
    'amount'
  ]) {
    if ((options as any)[x]) {
      sqlParts.push(`${x} LIKE @P${sqlParts.length + 1}`);
      sqlValues.push(`%${(options as any)[x]}%`);
    }
  }

  const whereQuery
    = sqlParts.length > 0 ? `WHERE ${sqlParts.join(' AND ')}` : '';
  const sqlQuery = `
    SELECT * FROM "Book"
    ${whereQuery}
    ORDER BY id
    OFFSET @P${sqlParts.length + 1} ROWS FETCH NEXT @P${
      sqlParts.length + 2
    } ROWS ONLY;
  `;

  const finalValues = [...sqlValues, options.offset, options.limit];

  const countQuery = `
    SELECT COUNT(*) FROM "Book"
    ${whereQuery}
  `;

  const [books, [{ '': totalCount }]] = await Promise.all([
    prisma.$queryRawUnsafe<Book[]>(sqlQuery, ...finalValues),
    prisma.$queryRawUnsafe<any>(countQuery, ...finalValues)
  ]);

  return { data: books, totalCount: totalCount as number };
}

export async function getBookById(id: string) {
  const book = await prisma.$queryRaw<
    Book[]
  >`SELECT * FROM Book WHERE id = ${id};`;
  return book.at(0);
}

export async function deleteBookById(id: string) {
  const book = await prisma.$queryRaw<Book[]>`
    DELETE FROM Book
    OUTPUT DELETED.*
    WHERE id = ${id}
  `;
  return book.at(0);
}

export type BookCreateOptions = Omit<Book, 'id'>;

export async function createBook({
  name,
  isbn,
  author,
  publisher,
  publishAt,
  bookTypeId,
  indexNumber,
  price,
  pages,
  summary,
  amount
}: BookCreateOptions) {
  const book = await prisma.$queryRaw<Book[]>`
        INSERT INTO "Book" ("id", "name", "isbn", "author", "publisher", "publishAt", "bookTypeId", "indexNumber", "price", "pages", "summary", "amount")
        OUTPUT INSERTED.*
        VALUES (${v4()}, ${name}, ${isbn}, ${author}, ${publisher}, ${publishAt}, ${bookTypeId}, ${indexNumber}, ${price}, ${pages}, ${summary}, ${amount});
    `;

  return book.at(0);
}

export type BookUpdateOptions = Partial<BookCreateOptions>;

export async function updateBook(bookId: string, options: BookUpdateOptions) {
  const sqlParts = [];
  const sqlValues: any[] = [];

  for (const x of [
    'name',
    'isbn',
    'author',
    'publisher',
    'publishAt',
    'bookTypeId',
    'indexNumber',
    'price',
    'pages',
    'summary',
    'amount'
  ]) {
    if ((options as any)[x]) {
      sqlParts.push(`${x} = @P${sqlParts.length + 1}`);
      sqlValues.push((options as any)[x]);
    }
  }

  if (sqlParts.length > 0) {
    const updateQuery = `
            UPDATE "Book"
            SET ${sqlParts.join(', ')}
            OUTPUT INSERTED.*
            WHERE "id" = '${bookId}'
        `;

    const updatedBook = await prisma.$queryRawUnsafe<Book[]>(
      updateQuery,
      ...sqlValues
    );

    return updatedBook.at(0);
  }
  return await getBookById(bookId);
}
