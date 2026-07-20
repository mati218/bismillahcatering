import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const faq = await prisma.faq.update({
    where: { id },
    data: {
      question: body.question,
      answer: body.answer,
      order: body.order,
      published: body.published,
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.faq.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
