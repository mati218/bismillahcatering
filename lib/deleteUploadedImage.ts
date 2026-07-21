/**
 * Best-effort cleanup: tells the server to delete the Cloudinary asset behind
 * this URL (no-op server-side for non-Cloudinary URLs). Fire-and-forget —
 * failures here shouldn't block the admin UI.
 */
export function deleteUploadedImage(url: string | undefined | null) {
  if (!url) return;
  fetch('/api/admin/uploads', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  }).catch(() => {});
}
