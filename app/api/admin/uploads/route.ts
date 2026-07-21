import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { deleteCloudinaryAsset } from '@/lib/cloudinary';

const MAX_SIZE = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'bismillah-catering',
    });
    return NextResponse.json({ url: result.secure_url });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// Deletes the Cloudinary asset behind a given image URL, so replacing/removing
// an image in the admin panel doesn't leave the old file taking up storage.
export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === 'string' ? body.url : '';
  await deleteCloudinaryAsset(url);
  return NextResponse.json({ ok: true });
}
