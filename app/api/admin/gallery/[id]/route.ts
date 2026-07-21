import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteCloudinaryAssets } from '@/lib/cloudinary';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.galleryEvent.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  });
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const images = Array.isArray(body.images) ? body.images : [];

  const event = await prisma.$transaction(async (tx) => {
    await tx.galleryImage.deleteMany({ where: { eventId: id } });
    return tx.galleryEvent.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category,
        cover: body.cover,
        description: body.description,
        date: body.date,
        featured: body.featured,
        order: body.order,
        images: {
          create: images.map((img: { src: string; caption?: string }, i: number) => ({
            src: img.src,
            caption: img.caption || '',
            order: i,
          })),
        },
      },
      include: { images: { orderBy: { order: 'asc' } } },
    });
  });

  return NextResponse.json(event);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.galleryEvent.delete({
    where: { id },
    include: { images: true },
  });
  await deleteCloudinaryAssets([event.cover, ...event.images.map((i) => i.src)]);
  return NextResponse.json({ ok: true });
}
