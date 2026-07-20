import { prisma } from '@/lib/prisma';

export async function getWhyChooseUsReasons() {
  return prisma.whyChooseUsReason.findMany({ orderBy: { order: 'asc' } });
}
