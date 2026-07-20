import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PageHeader, LinkButton, Card, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { FaPlus, FaEdit } from 'react-icons/fa';

export const metadata = { title: 'Services' };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage the services offered, shown on the services page and homepage."
        action={<LinkButton href="/admin/services/new"><FaPlus /> Add Service</LinkButton>}
      />

      {services.length === 0 ? (
        <Card><EmptyState message="No services yet." /></Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-dark/40 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Starting Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-dark font-medium">{s.title}</td>
                  <td className="px-5 py-3 text-dark/60">{s.slug}</td>
                  <td className="px-5 py-3 text-dark/60">{s.startingPrice || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${s.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-dark/50'}`}>
                      {s.published ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/services/${s.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors">
                        <FaEdit className="text-xs" />
                      </Link>
                      <DeleteButton url={`/api/admin/services/${s.id}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
