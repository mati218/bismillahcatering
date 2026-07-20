import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { PageHeader, LinkButton, Card, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { FaPlus, FaEdit } from 'react-icons/fa';

export const metadata = { title: 'Gallery' };

export default async function AdminGalleryPage() {
  const events = await prisma.galleryEvent.findMany({
    orderBy: { order: 'asc' },
    include: { images: true },
  });

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Manage gallery events shown on the gallery page."
        action={<LinkButton href="/admin/gallery/new"><FaPlus /> Add Event</LinkButton>}
      />

      {events.length === 0 ? (
        <Card><EmptyState message="No gallery events yet." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e) => (
            <Card key={e.id} className="overflow-hidden">
              <div className="relative h-36 bg-gray-100">
                {e.cover && <Image src={e.cover} alt={e.title} fill className="object-cover" unoptimized />}
              </div>
              <div className="p-4">
                <p className="font-medium text-dark">{e.title}</p>
                <p className="text-xs text-dark/40 capitalize">{e.category} &middot; {e.images.length} photos</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link href={`/admin/gallery/${e.id}`} className="inline-flex items-center gap-1.5 text-sm text-dark/70 hover:text-dark">
                    <FaEdit className="text-xs" /> Edit
                  </Link>
                  <DeleteButton url={`/api/admin/gallery/${e.id}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
