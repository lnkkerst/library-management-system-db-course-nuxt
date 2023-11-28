import { PrismaClient } from '@prisma/client';

function prismaClientSingleton() {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['query']
  });
  return prisma;
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
