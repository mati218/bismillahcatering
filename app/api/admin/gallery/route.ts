import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.galleryEvent.findMany({
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' } } },
  });
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.category || !body?.cover) {
    return NextResponse.json({ error: 'Title, category and cover are required' }, { status: 400 });
  }
  const images = Array.isArray(body.images) ? body.images : [];

  const event = await prisma.galleryEvent.create({
    data: {
      title: body.title,
      category: body.category,
      cover: body.cover,
      description: body.description || '',
      date: body.date || '',
      featured: body.featured ?? false,
      order: body.order ?? 0,
      images: {
        create: images.map((img: { src: string; caption?: string }, i: number) => ({
          src: img.src,
          caption: img.caption || '',
          order: i,
        })),
      },
    },
    include: { images: true },
  });
  return NextResponse.json(event, { status: 201 });
}
