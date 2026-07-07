import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import ServiceDetailClient from './ServiceDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
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
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Related services (others from same category, or just next 3)
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return <ServiceDetailClient service={service} related={related} />;
}
