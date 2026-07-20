import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
    include: {
      gallery: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
    },
  });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.slug || !body?.description) {
    return NextResponse.json({ error: 'Title, slug and description are required' }, { status: 400 });
  }

  const existing = await prisma.service.findUnique({ where: { slug: body.slug } });
  if (existing) {
    return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 409 });
  }

  const gallery = Array.isArray(body.gallery) ? body.gallery : [];
  const highlights = Array.isArray(body.highlights) ? body.highlights : [];

  const service = await prisma.service.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      longDescription: body.longDescription || '',
      icon: body.icon || 'FaStar',
      image: body.image || '',
      startingPrice: body.startingPrice || null,
      features: Array.isArray(body.features) ? body.features : [],
      idealFor: Array.isArray(body.idealFor) ? body.idealFor : [],
      order: body.order ?? 0,
      published: body.published ?? true,
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
    include: { gallery: true, highlights: true },
  });
  return NextResponse.json(service, { status: 201 });
}
