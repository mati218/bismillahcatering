import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (lead.clientId) {
    return NextResponse.json({ error: 'Lead is already linked to a client' }, { status: 409 });
  }

  const client = await prisma.client.create({
    data: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      source: `Lead: ${lead.eventType}`,
    },
  });

  const updatedLead = await prisma.lead.update({
    where: { id },
    data: { clientId: client.id, status: 'converted' },
    include: { client: true },
  });

  return NextResponse.json(updatedLead);
}
