import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const steps = await prisma.processStep.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(steps);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.description || !body?.icon || !body?.number) {
    return NextResponse.json({ error: 'Number, icon, title and description are required' }, { status: 400 });
  }
  const step = await prisma.processStep.create({
    data: {
      number: body.number,
      icon: body.icon,
      title: body.title,
      description: body.description,
      color: body.color || '#F6C945',
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(step, { status: 201 });
}
