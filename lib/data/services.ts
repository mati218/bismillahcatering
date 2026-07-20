import { prisma } from '@/lib/prisma';

export async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    include: {
      gallery: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, published: true },
    include: {
      gallery: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
    },
  });
}
