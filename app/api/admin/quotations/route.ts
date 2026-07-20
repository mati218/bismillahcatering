import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function computeTotals(items: { quantity: number; unitPrice: number }[], discount: number, tax: number) {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const total = Math.max(0, subtotal - discount + tax);
  return { subtotal, total };
}

function generateQuotationNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `QT-${year}-${rand}`;
}

export async function GET() {
  const quotations = await prisma.quotation.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true, items: true },
  });
  return NextResponse.json(quotations);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.clientId || !body?.title) {
    return NextResponse.json({ error: 'Client and title are required' }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  const discount = Number(body.discount) || 0;
  const tax = Number(body.tax) || 0;
  const { subtotal, total } = computeTotals(items, discount, tax);

  const quotation = await prisma.quotation.create({
    data: {
      number: generateQuotationNumber(),
      clientId: body.clientId,
      title: body.title,
      status: body.status || 'draft',
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
  return NextResponse.json(quotation, { status: 201 });
}
