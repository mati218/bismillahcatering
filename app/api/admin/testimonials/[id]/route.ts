import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteCloudinaryAsset } from '@/lib/cloudinary';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      name: body.name,
      location: body.location,
      rating: body.rating,
      review: body.review,
      event: body.event,
      image: body.image,
      date: body.date,
      published: body.published,
      order: body.order,
    },
  });
  return NextResponse.json(testimonial);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.delete({ where: { id } });
  await deleteCloudinaryAsset(testimonial.image);
  return NextResponse.json({ ok: true });
}
