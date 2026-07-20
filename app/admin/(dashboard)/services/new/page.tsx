import { PageHeader } from '@/components/admin/ui';
import ServiceForm from '@/components/admin/services/ServiceForm';

export const metadata = { title: 'Add Service' };

const empty = {
  title: '', slug: '', description: '', longDescription: '', icon: 'FaStar', image: '',
  startingPrice: '', features: [], idealFor: [], order: 0, published: true, gallery: [], highlights: [],
};

export default function NewServicePage() {
  return (
    <div>
      <PageHeader title="Add Service" />
      <ServiceForm initial={empty} />
    </div>
  );
}
