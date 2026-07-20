import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const step = await prisma.processStep.update({
    where: { id },
    data: {
      number: body.number,
      icon: body.icon,
      title: body.title,
      description: body.description,
      color: body.color,
      order: body.order,
    },
  });
  return NextResponse.json(step);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.processStep.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
