import { NextResponse } from 'next/server';
import { getFaqs } from '@/lib/data/faqs';

export async function GET() {
  const faqs = await getFaqs();
  return NextResponse.json(faqs);
}
