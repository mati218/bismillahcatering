import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/data/settings';
import PrintButton from '@/components/common/PrintButton';

export const metadata = { title: 'Quotation', robots: { index: false, follow: false } };

export default async function PublicQuotationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [quotation, settings] = await Promise.all([
    prisma.quotation.findUnique({
      where: { publicToken: token },
      include: { client: true, items: { orderBy: { order: 'asc' } } },
    }),
    getSiteSettings(),
  ]);
  if (!quotation) notFound();

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12 print:shadow-none print:border-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-gray-100 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500">
              <Image src={settings.logoUrl} alt={settings.companyName} fill className="object-cover" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-dark">{settings.companyName}</p>
              <p className="text-dark/50 text-xs">{settings.address}</p>
              <p className="text-dark/50 text-xs">{settings.phone} &middot; {settings.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-heading text-2xl font-bold text-dark">Quotation</p>
            <p className="text-dark/50 text-sm">{quotation.number}</p>
            <span className="inline-block mt-1 text-xs px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-600 capitalize">{quotation.status}</span>
          </div>
        </div>

        {/* Client + meta */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider mb-1">Prepared For</p>
            <p className="font-medium text-dark">{quotation.client.name}</p>
            <p className="text-dark/60 text-sm">{quotation.client.phone}</p>
            {quotation.client.email && <p className="text-dark/60 text-sm">{quotation.client.email}</p>}
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider mb-1">Details</p>
            <p className="text-dark/70 text-sm">{quotation.title}</p>
            <p className="text-dark/50 text-sm">
              Issued {quotation.createdAt.toLocaleDateString()}
              {quotation.validUntil && ` — Valid until ${quotation.validUntil.toLocaleDateString()}`}
            </p>
          </div>
        </div>

        {/* Items table */}
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="text-left text-dark/40 border-b border-gray-200">
              <th className="py-2 font-medium">Description</th>
              <th className="py-2 font-medium text-right">Qty</th>
              <th className="py-2 font-medium text-right">Unit Price</th>
              <th className="py-2 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {quotation.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 text-dark">{item.description}</td>
                <td className="py-3 text-dark/70 text-right">{item.quantity}</td>
                <td className="py-3 text-dark/70 text-right">PKR {item.unitPrice.toLocaleString()}</td>
                <td className="py-3 text-dark text-right">PKR {item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex flex-col items-end gap-1.5 mb-8">
          <div className="flex items-center gap-8 text-sm">
            <span className="text-dark/60">Subtotal</span>
            <span className="text-dark w-32 text-right">PKR {quotation.subtotal.toLocaleString()}</span>
          </div>
          {quotation.discount > 0 && (
            <div className="flex items-center gap-8 text-sm">
              <span className="text-dark/60">Discount</span>
              <span className="text-dark w-32 text-right">- PKR {quotation.discount.toLocaleString()}</span>
            </div>
          )}
          {quotation.tax > 0 && (
            <div className="flex items-center gap-8 text-sm">
              <span className="text-dark/60">Tax</span>
              <span className="text-dark w-32 text-right">PKR {quotation.tax.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center gap-8 text-lg font-bold border-t border-gray-200 pt-2 mt-1">
            <span className="text-dark">Total</span>
            <span className="text-gold-600 w-32 text-right">PKR {quotation.total.toLocaleString()}</span>
          </div>
        </div>

        {quotation.notes && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-dark/70 text-sm whitespace-pre-line">{quotation.notes}</p>
          </div>
        )}

        <div className="flex justify-center">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
