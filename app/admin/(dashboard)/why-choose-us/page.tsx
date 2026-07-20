import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import ReasonManager from '@/components/admin/why-choose-us/ReasonManager';

export const metadata = { title: 'Why Choose Us' };

export default async function AdminWhyChooseUsPage() {
  const reasons = await prisma.whyChooseUsReason.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader title="Why Choose Us" description="Manage the 'Bismillah Difference' reason cards shown on the homepage." />
      <ReasonManager initial={reasons} />
    </div>
  );
}
