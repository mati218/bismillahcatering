import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(faqs);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.question || !body?.answer) {
    return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
  }
  const faq = await prisma.faq.create({
    data: {
      question: body.question,
      answer: body.answer,
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(faq, { status: 201 });
}
