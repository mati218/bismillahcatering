import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const reasons = await prisma.whyChooseUsReason.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(reasons);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.description || !body?.icon) {
    return NextResponse.json({ error: 'Icon, title and description are required' }, { status: 400 });
  }
  const reason = await prisma.whyChooseUsReason.create({
    data: {
      icon: body.icon,
      title: body.title,
      description: body.description,
      color: body.color || '#F6C945',
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(reason, { status: 201 });
}
