import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import GalleryEventForm from '@/components/admin/gallery/GalleryEventForm';

export const metadata = { title: 'Edit Gallery Event' };

export default async function EditGalleryEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.galleryEvent.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  });
  if (!event) notFound();

  return (
    <div>
      <PageHeader title="Edit Gallery Event" />
      <GalleryEventForm
        eventId={id}
        initial={{
          title: event.title,
          category: event.category,
          cover: event.cover,
          description: event.description || '',
          date: event.date || '',
          featured: event.featured,
          order: event.order,
          images: event.images.map((img) => ({ src: img.src, caption: img.caption || '' })),
        }}
      />
    </div>
  );
}
