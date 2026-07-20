import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PageHeader, LinkButton, Card, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { FaPlus, FaEye } from 'react-icons/fa';

export const metadata = { title: 'Clients' };

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { leads: true, quotations: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Manage your client list."
        action={<LinkButton href="/admin/clients/new"><FaPlus /> Add Client</LinkButton>}
      />

      {clients.length === 0 ? (
        <Card><EmptyState message="No clients yet." /></Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-dark/40 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Leads</th>
                <th className="px-5 py-3 font-medium">Quotations</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-dark font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-dark/60">
                    <p>{c.phone}</p>
                    {c.email && <p className="text-xs text-dark/40">{c.email}</p>}
                  </td>
                  <td className="px-5 py-3 text-dark/60">{c._count.leads}</td>
                  <td className="px-5 py-3 text-dark/60">{c._count.quotations}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/clients/${c.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors">
                        <FaEye className="text-xs" />
                      </Link>
                      <DeleteButton url={`/api/admin/clients/${c.id}`} />
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
