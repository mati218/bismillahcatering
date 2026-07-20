import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.phone || !body?.email || !body?.eventType || !body?.message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      eventType: body.eventType,
      eventDate: body.date || body.eventDate || null,
      guests: body.guests ? String(body.guests) : null,
      message: body.message,
      source: body.source === 'booking' ? 'booking' : 'contact',
    },
  });
  return NextResponse.json(lead, { status: 201 });
}
