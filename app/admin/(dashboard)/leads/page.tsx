import { prisma } from '@/lib/prisma';
import { PageHeader, Card } from '@/components/admin/ui';
import LeadsTable from '@/components/admin/leads/LeadsTable';

export const metadata = { title: 'Leads' };

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <PageHeader title="Leads" description="Inquiries submitted through the booking and contact forms." />
      <Card>
        <LeadsTable initial={leads} />
      </Card>
    </div>
  );
}
