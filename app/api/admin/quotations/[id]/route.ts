import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function computeTotals(items: { quantity: number; unitPrice: number }[], discount: number, tax: number) {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const total = Math.max(0, subtotal - discount + tax);
  return { subtotal, total };
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quotation = await prisma.quotation.findUnique({
    where: { id },
    include: { client: true, items: { orderBy: { order: 'asc' } } },
  });
  if (!quotation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(quotation);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const items = Array.isArray(body.items) ? body.items : [];
  const discount = Number(body.discount) || 0;
  const tax = Number(body.tax) || 0;
  const { subtotal, total } = computeTotals(items, discount, tax);

  const quotation = await prisma.$transaction(async (tx) => {
    await tx.quotationItem.deleteMany({ where: { quotationId: id } });
    return tx.quotation.update({
      where: { id },
      data: {
        clientId: body.clientId,
        title: body.title,
        status: body.status,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        notes: body.notes || null,
        subtotal,
        discount,
        tax,
        total,
        items: {
          create: items.map((i: { description: string; quantity: number; unitPrice: number }, idx: number) => ({
            description: i.description,
            quantity: Number(i.quantity) || 1,
            unitPrice: Number(i.unitPrice) || 0,
            total: (Number(i.quantity) || 1) * (Number(i.unitPrice) || 0),
            order: idx,
          })),
        },
      },
      include: { client: true, items: { orderBy: { order: 'asc' } } },
    });
  });

  return NextResponse.json(quotation);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.quotation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
