import { NextResponse } from 'next/server';
import { getGalleryEvents } from '@/lib/data/gallery';

export async function GET() {
  const events = await getGalleryEvents();
  return NextResponse.json(events);
}
