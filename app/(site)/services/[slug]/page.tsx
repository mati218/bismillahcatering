import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/data/services';
import { getSiteSettings } from '@/lib/data/settings';
import ServiceDetailClient from './ServiceDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Bismillah Catering`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Bismillah Catering`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, allServices, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSiteSettings(),
  ]);
  if (!service) notFound();

  // Related services (others from same category, or just next 3)
  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <ServiceDetailClient
      service={service}
      related={related}
      whatsapp={settings.whatsapp}
      phone={settings.phone}
    />
  );
}
