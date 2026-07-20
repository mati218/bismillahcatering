import { prisma } from '@/lib/prisma';

export async function getGalleryEvents() {
  return prisma.galleryEvent.findMany({
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' } } },
  });
}

export async function getGalleryCategories() {
  const events = await prisma.galleryEvent.findMany({ select: { category: true }, distinct: ['category'] });
  return events.map((e) => e.category).sort();
}
