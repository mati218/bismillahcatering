import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import ServiceForm from '@/components/admin/services/ServiceForm';

export const metadata = { title: 'Edit Service' };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      gallery: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
    },
  });
  if (!service) notFound();

  return (
    <div>
      <PageHeader title="Edit Service" />
      <ServiceForm
        serviceId={id}
        initial={{
          title: service.title,
          slug: service.slug,
          description: service.description,
          longDescription: service.longDescription,
          icon: service.icon,
          image: service.image,
          startingPrice: service.startingPrice || '',
          features: service.features,
          idealFor: service.idealFor,
          order: service.order,
          published: service.published,
          gallery: service.gallery.map((g) => ({ src: g.src, alt: g.alt, type: g.type as 'image' | 'video' })),
          highlights: service.highlights.map((h) => ({ icon: h.icon, title: h.title, description: h.description })),
        }}
      />
    </div>
  );
}
