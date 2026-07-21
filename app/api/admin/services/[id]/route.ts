import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteCloudinaryAssets } from '@/lib/cloudinary';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      gallery: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
    },
  });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  if (body.slug) {
    const existing = await prisma.service.findUnique({ where: { slug: body.slug } });
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 409 });
    }
  }

  const gallery = Array.isArray(body.gallery) ? body.gallery : [];
  const highlights = Array.isArray(body.highlights) ? body.highlights : [];

  const service = await prisma.$transaction(async (tx) => {
    await tx.serviceGalleryItem.deleteMany({ where: { serviceId: id } });
    await tx.serviceHighlight.deleteMany({ where: { serviceId: id } });
    return tx.service.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        longDescription: body.longDescription,
        icon: body.icon,
        image: body.image,
        startingPrice: body.startingPrice || null,
        features: Array.isArray(body.features) ? body.features : undefined,
        idealFor: Array.isArray(body.idealFor) ? body.idealFor : undefined,
        order: body.order,
        published: body.published,
        gallery: {
          create: gallery.map((g: { src: string; alt: string; type: string }, i: number) => ({
            src: g.src,
            alt: g.alt || '',
            type: g.type || 'image',
            order: i,
          })),
        },
        highlights: {
          create: highlights.map((h: { icon: string; title: string; description: string }, i: number) => ({
            icon: h.icon,
            title: h.title,
            description: h.description,
            order: i,
          })),
        },
      },
      include: { gallery: { orderBy: { order: 'asc' } }, highlights: { orderBy: { order: 'asc' } } },
    });
  });

  return NextResponse.json(service);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.delete({
    where: { id },
    include: { gallery: true },
  });
  await deleteCloudinaryAssets([service.image, ...service.gallery.map((g) => g.src)]);
  return NextResponse.json({ ok: true });
}
