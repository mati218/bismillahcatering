import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PageHeader, Card, LinkButton, EmptyState } from '@/components/admin/ui';
import ClientForm from '@/components/admin/clients/ClientForm';
import { FaPlus } from 'react-icons/fa';

export const metadata = { title: 'Client Details' };

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      leads: { orderBy: { createdAt: 'desc' } },
      quotations: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={client.name} description="Client details, leads, and quotations." />

      <div className="grid lg:grid-cols-2 gap-8">
        <ClientForm
          clientId={id}
          initial={{
            name: client.name,
            phone: client.phone,
            email: client.email || '',
            address: client.address || '',
            notes: client.notes || '',
            source: client.source || '',
          }}
        />

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-dark">Quotations</h3>
              <LinkButton href={`/admin/quotations/new?clientId=${id}`} variant="secondary">
                <FaPlus /> New Quotation
              </LinkButton>
            </div>
            {client.quotations.length === 0 ? (
              <Card><EmptyState message="No quotations yet." /></Card>
            ) : (
              <Card className="divide-y divide-gray-100">
                {client.quotations.map((q) => (
                  <Link key={q.id} href={`/admin/quotations/${q.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-dark text-sm">{q.number} — {q.title}</p>
                      <p className="text-xs text-dark/40 capitalize">{q.status}</p>
                    </div>
                    <p className="font-semibold text-dark text-sm">PKR {q.total.toLocaleString()}</p>
                  </Link>
                ))}
              </Card>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-3">Leads</h3>
            {client.leads.length === 0 ? (
              <Card><EmptyState message="No linked leads." /></Card>
            ) : (
              <Card className="divide-y divide-gray-100">
                {client.leads.map((lead) => (
                  <div key={lead.id} className="p-4">
                    <p className="font-medium text-dark text-sm">{lead.eventType}</p>
                    <p className="text-xs text-dark/50 mt-0.5 line-clamp-2">{lead.message}</p>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
