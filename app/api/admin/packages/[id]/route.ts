import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { features: { orderBy: { order: 'asc' } } },
  });
  if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(pkg);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const features = Array.isArray(body.features) ? body.features : [];

  const pkg = await prisma.$transaction(async (tx) => {
    await tx.packageFeature.deleteMany({ where: { packageId: id } });
    return tx.package.update({
      where: { id },
      data: {
        name: body.name,
        tier: body.tier,
        tagline: body.tagline,
        price: body.price,
        priceNote: body.priceNote,
        featured: body.featured,
        badge: body.badge || null,
        color: body.color,
        order: body.order,
        features: {
          create: features.map((f: { text: string; included: boolean }, i: number) => ({
            text: f.text,
            included: !!f.included,
            order: i,
          })),
        },
      },
      include: { features: { orderBy: { order: 'asc' } } },
    });
  });

  return NextResponse.json(pkg);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.package.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
