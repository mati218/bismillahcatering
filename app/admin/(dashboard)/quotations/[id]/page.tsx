import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import QuotationForm from '@/components/admin/quotations/QuotationForm';

export const metadata = { title: 'Edit Quotation' };

export default async function EditQuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [quotation, clients, headerList] = await Promise.all([
    prisma.quotation.findUnique({ where: { id }, include: { items: { orderBy: { order: 'asc' } } } }),
    prisma.client.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, phone: true } }),
    headers(),
  ]);
  if (!quotation) notFound();

  const host = headerList.get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const shareUrl = `${protocol}://${host}/quote/${quotation.publicToken}`;

  return (
    <div>
      <PageHeader title={`Quotation ${quotation.number}`} />
      <QuotationForm
        quotationId={id}
        clients={clients}
        shareUrl={shareUrl}
        initial={{
          clientId: quotation.clientId,
          title: quotation.title,
          status: quotation.status,
          validUntil: quotation.validUntil ? quotation.validUntil.toISOString().slice(0, 10) : '',
          notes: quotation.notes || '',
          discount: quotation.discount,
          tax: quotation.tax,
          items: quotation.items.map((i) => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice })),
        }}
      />
    </div>
  );
}
