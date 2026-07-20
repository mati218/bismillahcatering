import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.review || !body?.event) {
    return NextResponse.json({ error: 'Name, review and event are required' }, { status: 400 });
  }
  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      location: body.location || '',
      rating: body.rating ?? 5,
      review: body.review,
      event: body.event,
      image: body.image || '',
      date: body.date || '',
      published: body.published ?? true,
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(testimonial, { status: 201 });
}
