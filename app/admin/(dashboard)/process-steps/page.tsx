import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import ProcessStepManager from '@/components/admin/process-steps/ProcessStepManager';

export const metadata = { title: 'Process Steps' };

export default async function AdminProcessStepsPage() {
  const steps = await prisma.processStep.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader title="Process Steps" description="Manage the 'How It Works' step-by-step process shown on the services page." />
      <ProcessStepManager initial={steps} />
    </div>
  );
}
