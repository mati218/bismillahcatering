import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { leads: true, quotations: true } } },
  });
  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
  }
  const client = await prisma.client.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      address: body.address || null,
      notes: body.notes || null,
      source: body.source || null,
    },
  });
  return NextResponse.json(client, { status: 201 });
}
