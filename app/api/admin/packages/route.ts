import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const packages = await prisma.package.findMany({
    orderBy: { order: 'asc' },
    include: { features: { orderBy: { order: 'asc' } } },
  });
  return NextResponse.json(packages);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.tier || !body?.price) {
    return NextResponse.json({ error: 'Name, tier and price are required' }, { status: 400 });
  }
  const features = Array.isArray(body.features) ? body.features : [];

  const pkg = await prisma.package.create({
    data: {
      name: body.name,
      tier: body.tier,
      tagline: body.tagline || '',
      price: body.price,
      priceNote: body.priceNote || 'Starting from',
      featured: body.featured ?? false,
      badge: body.badge || null,
      color: body.color || '#F6C945',
      order: body.order ?? 0,
      features: {
        create: features.map((f: { text: string; included: boolean }, i: number) => ({
          text: f.text,
          included: !!f.included,
          order: i,
        })),
      },
    },
    include: { features: true },
  });
  return NextResponse.json(pkg, { status: 201 });
}
