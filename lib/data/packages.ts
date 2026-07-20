import { prisma } from '@/lib/prisma';

export async function getPackages() {
  return prisma.package.findMany({
    orderBy: { order: 'asc' },
    include: { features: { orderBy: { order: 'asc' } } },
  });
}
