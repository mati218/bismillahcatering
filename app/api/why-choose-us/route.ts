import { NextResponse } from 'next/server';
import { getWhyChooseUsReasons } from '@/lib/data/whyChooseUs';

export async function GET() {
  const reasons = await getWhyChooseUsReasons();
  return NextResponse.json(reasons);
}
