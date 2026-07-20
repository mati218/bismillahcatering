import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import FaqManager from '@/components/admin/faqs/FaqManager';

export const metadata = { title: 'FAQs' };

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader title="FAQs" description="Manage the frequently asked questions shown on the packages page." />
      <FaqManager initial={faqs} />
    </div>
  );
}
