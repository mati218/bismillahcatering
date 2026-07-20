import { prisma } from '@/lib/prisma';

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}
