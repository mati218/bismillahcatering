import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/data/settings';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}
