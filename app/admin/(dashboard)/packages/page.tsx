import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PageHeader, LinkButton, Card, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { FaPlus, FaEdit } from 'react-icons/fa';

export const metadata = { title: 'Packages' };

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { order: 'asc' },
    include: { features: true },
  });

  return (
    <div>
      <PageHeader
        title="Packages"
        description="Manage pricing packages shown on the packages page."
        action={<LinkButton href="/admin/packages/new"><FaPlus /> Add Package</LinkButton>}
      />

      {packages.length === 0 ? (
        <Card><EmptyState message="No packages yet." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((p) => (
            <Card key={p.id} className="p-5 flex flex-col" style={{ borderColor: p.color }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-dark">{p.name}</span>
                {p.badge && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${p.color}30` }}>{p.badge}</span>}
              </div>
              <p className="text-sm text-dark/50">{p.tagline}</p>
              <p className="font-heading text-lg font-bold text-dark mt-2">{p.price}</p>
              <p className="text-xs text-dark/40 mb-3">{p.features.length} features</p>
              <div className="mt-auto flex items-center gap-2">
                <Link href={`/admin/packages/${p.id}`} className="inline-flex items-center gap-1.5 text-sm text-dark/70 hover:text-dark">
                  <FaEdit className="text-xs" /> Edit
                </Link>
                <DeleteButton url={`/api/admin/packages/${p.id}`} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
