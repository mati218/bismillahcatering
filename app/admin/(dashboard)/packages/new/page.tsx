import { PageHeader } from '@/components/admin/ui';
import PackageForm from '@/components/admin/packages/PackageForm';

export const metadata = { title: 'Add Package' };

const empty = {
  name: '', tier: '', tagline: '', price: '', priceNote: 'Starting from',
  featured: false, badge: '', color: '#F6C945', order: 0, features: [],
};

export default function NewPackagePage() {
  return (
    <div>
      <PageHeader title="Add Package" />
      <PackageForm initial={empty} />
    </div>
  );
}
