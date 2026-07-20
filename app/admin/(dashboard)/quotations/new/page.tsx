import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import QuotationForm from '@/components/admin/quotations/QuotationForm';

export const metadata = { title: 'New Quotation' };

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { clientId } = await searchParams;
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, phone: true } });

  return (
    <div>
      <PageHeader title="New Quotation" />
      <QuotationForm
        clients={clients}
        initial={{
          clientId: clientId || '',
          title: '',
          status: 'draft',
          validUntil: '',
          notes: '',
          discount: 0,
          tax: 0,
          items: [],
        }}
      />
    </div>
  );
}
