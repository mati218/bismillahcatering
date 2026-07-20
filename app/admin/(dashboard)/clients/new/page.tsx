import { PageHeader } from '@/components/admin/ui';
import ClientForm from '@/components/admin/clients/ClientForm';

export const metadata = { title: 'Add Client' };

const empty = { name: '', phone: '', email: '', address: '', notes: '', source: '' };

export default function NewClientPage() {
  return (
    <div>
      <PageHeader title="Add Client" />
      <ClientForm initial={empty} />
    </div>
  );
}
