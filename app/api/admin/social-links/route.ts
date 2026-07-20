import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const links = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(links);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.platform || !body?.url || !body?.icon) {
    return NextResponse.json({ error: 'Platform, url and icon are required' }, { status: 400 });
  }
  const link = await prisma.socialLink.create({
    data: {
      platform: body.platform,
      url: body.url,
      icon: body.icon,
      order: body.order ?? 0,
      enabled: body.enabled ?? true,
    },
  });
  return NextResponse.json(link, { status: 201 });
}
