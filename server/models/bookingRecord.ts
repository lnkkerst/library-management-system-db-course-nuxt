import type { BookingRecord } from '@prisma/client';
import { v4 } from 'uuid';
import { prisma } from '~/prisma/db';

export interface BookingRecordRich {
  id: string
  bookingDate: string
  bookId: string
  readerId: string
  name: string
  isbn: string
  author: string
  publisher: string
  publishAt: string
  bookTypeId: string
  indexNumber: string
  price: number
  pages: number
  summary: string
  amount: number
  recordId: string
}

export async function getBookingRecordsByReaderId(readerId: string) {
  const res = await prisma.$queryRaw<BookingRecordRich[]>`
    SELECT 
      *,
      BookingRecord.id as recordId,
      BookingRecord.bookingDate
    FROM BookingRecord
    INNER JOIN Book ON Book.id = BookingRecord.bookId
    WHERE "readerId" = ${readerId};
  `;
  return res;
}

type BookingRecordCreateOptions = Omit<BookingRecord, 'id' | 'bookingDate'>;

export async function createBookingRecord(opts: BookingRecordCreateOptions) {
  const res = await prisma.$queryRaw<BookingRecord[]>`
    BEGIN TRANSACTION

    INSERT INTO "BookingRecord" ("id", "bookId", "readerId", "bookingDate")
    OUTPUT INSERTED.*
    VALUES (${v4()}, ${opts.bookId}, ${opts.readerId}, ${new Date()})

    UPDATE Book
    SET amount = amount - 1
    WHERE id = ${opts.bookId}

    COMMIT TRANSACTION
  `;
  return res.at(0);
}

export async function deleteBookingRecordById(id: string) {
  const record = await getBookingRecordById(id);
  if (!record) {
    throw createError({
      statusCode: 404
    });
  }
  const res = await prisma.$queryRaw<BookingRecord[]>`
    BEGIN TRANSACTION

    DELETE FROM "BookingRecord"
    OUTPUT DELETED.*
    WHERE id = ${id};

    UPDATE Book
    SET amount = amount + 1
    WHERE id = ${record.bookId}

    COMMIT TRANSACTION
  `;
  return res.at(0);
}

export async function getBookingRecordById(id: string) {
  const res = await prisma.$queryRaw<BookingRecord[]>`
    SELECT * FROM BookingRecord
    WHERE "id" = ${id}
  `;
  return res.at(0);
}
