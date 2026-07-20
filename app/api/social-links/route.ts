import { NextResponse } from 'next/server';
import { getSocialLinks } from '@/lib/data/socialLinks';

export async function GET() {
  const links = await getSocialLinks();
  return NextResponse.json(links);
}
