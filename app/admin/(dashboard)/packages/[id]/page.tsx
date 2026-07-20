import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import PackageForm from '@/components/admin/packages/PackageForm';

export const metadata = { title: 'Edit Package' };

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { features: { orderBy: { order: 'asc' } } },
  });
  if (!pkg) notFound();

  return (
    <div>
      <PageHeader title="Edit Package" />
      <PackageForm
        packageId={id}
        initial={{
          name: pkg.name,
          tier: pkg.tier,
          tagline: pkg.tagline,
          price: pkg.price,
          priceNote: pkg.priceNote,
          featured: pkg.featured,
          badge: pkg.badge || '',
          color: pkg.color,
          order: pkg.order,
          features: pkg.features.map((f) => ({ text: f.text, included: f.included })),
        }}
      />
    </div>
  );
}
