import type { Book } from '@prisma/client';
import { prisma } from '~/prisma/db';

export async function getBooks() {
  const books = await prisma.$queryRaw<Book[]>`SELECT * FROM Book;`;
  return books;
}

export async function getBookById(id: string) {
  const book = await prisma.$queryRaw<
    Book[]
  >`SELECT * FROM Book WHERE id = ${id};`;
  return book.at(0);
}

export type BookCreateOptions = Omit<Book, 'id' | 'bookTypeId'> & {
  bookTypeId?: string
};

export async function createBook(book: BookCreateOptions) {}
