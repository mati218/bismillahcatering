import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const link = await prisma.socialLink.update({
    where: { id },
    data: {
      platform: body.platform,
      url: body.url,
      icon: body.icon,
      order: body.order,
      enabled: body.enabled,
    },
  });
  return NextResponse.json(link);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.socialLink.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
