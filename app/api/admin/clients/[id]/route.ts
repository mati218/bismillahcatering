import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      leads: { orderBy: { createdAt: 'desc' } },
      quotations: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(client);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const client = await prisma.client.update({
    where: { id },
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      address: body.address || null,
      notes: body.notes || null,
      source: body.source || null,
    },
  });
  return NextResponse.json(client);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.client.delete({ where: { id } });
  } catch {
    return NextResponse.json(
      { error: 'Cannot delete a client with linked leads or quotations. Remove those first.' },
      { status: 409 }
    );
  }
  return NextResponse.json({ ok: true });
}
