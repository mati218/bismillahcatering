import { v2 as cloudinary } from 'cloudinary';

// Matches https://res.cloudinary.com/<cloud>/image/upload/v<version>/<public_id>.<ext>
export const CLOUDINARY_URL_PATTERN =
  /^https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/;

/**
 * Deletes the Cloudinary asset behind a URL. No-op for non-Cloudinary URLs
 * (external links, legacy local /uploads/... paths). Best-effort — swallows
 * errors so a failed cleanup never blocks the caller's main operation.
 */
export async function deleteCloudinaryAsset(url: string | null | undefined) {
  if (!url) return;
  const match = url.match(CLOUDINARY_URL_PATTERN);
  if (!match) return;
  try {
    await cloudinary.uploader.destroy(match[1]);
  } catch {
    // best-effort cleanup
  }
}

export async function deleteCloudinaryAssets(urls: (string | null | undefined)[]) {
  await Promise.all(urls.map(deleteCloudinaryAsset));
}
