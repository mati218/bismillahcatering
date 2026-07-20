import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 'singleton' } });
  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const settings = await prisma.siteSetting.upsert({
    where: { id: 'singleton' },
    update: {
      companyName: body.companyName,
      phone: body.phone,
      whatsapp: body.whatsapp,
      email: body.email,
      address: body.address,
      googleMapUrl: body.googleMapUrl,
      logoUrl: body.logoUrl,
      ogImageUrl: body.ogImageUrl,
      aboutText: body.aboutText,
      foundedYear: body.foundedYear,
    },
    create: {
      id: 'singleton',
      companyName: body.companyName || 'Bismillah Catering',
      phone: body.phone || '',
      whatsapp: body.whatsapp || '',
      email: body.email || '',
      address: body.address || '',
      googleMapUrl: body.googleMapUrl || '',
      logoUrl: body.logoUrl || '/logo.jpg',
      ogImageUrl: body.ogImageUrl || '/og-image.jpg',
      aboutText: body.aboutText || '',
      foundedYear: body.foundedYear || 2014,
    },
  });
  return NextResponse.json(settings);
}
