import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PageHeader, LinkButton, Card, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { FaPlus, FaEdit } from 'react-icons/fa';

export const metadata = { title: 'Quotations' };

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-dark/60',
  sent: 'bg-blue-50 text-blue-600',
  accepted: 'bg-green-50 text-green-600',
  rejected: 'bg-red-50 text-red-600',
  expired: 'bg-yellow-50 text-yellow-700',
};

export default async function AdminQuotationsPage() {
  const quotations = await prisma.quotation.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true },
  });

  return (
    <div>
      <PageHeader
        title="Quotations"
        description="Create and manage quotations for clients."
        action={<LinkButton href="/admin/quotations/new"><FaPlus /> New Quotation</LinkButton>}
      />

      {quotations.length === 0 ? (
        <Card><EmptyState message="No quotations yet." /></Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-dark/40 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Number</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-dark font-medium">{q.number}</td>
                  <td className="px-5 py-3 text-dark/70">{q.client.name}</td>
                  <td className="px-5 py-3 text-dark/70">{q.title}</td>
                  <td className="px-5 py-3 text-dark/70">PKR {q.total.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[q.status] || 'bg-gray-100 text-dark/60'}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/quotations/${q.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors">
                        <FaEdit className="text-xs" />
                      </Link>
                      <DeleteButton url={`/api/admin/quotations/${q.id}`} />
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
