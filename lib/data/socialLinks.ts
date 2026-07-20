import { prisma } from '@/lib/prisma';

export async function getSocialLinks() {
  return prisma.socialLink.findMany({
    where: { enabled: true },
    orderBy: { order: 'asc' },
  });
}
