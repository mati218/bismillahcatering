import { prisma } from '@/lib/prisma';

const FALLBACK = {
  id: 'singleton',
  companyName: 'Bismillah Catering',
  phone: '+92-300-0000000',
  whatsapp: '923000000000',
  email: 'info@bismillahcatering.com',
  address: 'Lahore, Pakistan',
  googleMapUrl: '#',
  logoUrl: '/logo.jpg',
  ogImageUrl: '/og-image.jpg',
  aboutText: '',
  foundedYear: 2014,
  updatedAt: new Date(),
};

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 'singleton' } });
  return settings ?? FALLBACK;
}
