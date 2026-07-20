import { PageHeader } from '@/components/admin/ui';
import GalleryEventForm from '@/components/admin/gallery/GalleryEventForm';

export const metadata = { title: 'Add Gallery Event' };

const empty = {
  title: '', category: '', cover: '', description: '', date: '', featured: false, order: 0, images: [],
};

export default function NewGalleryEventPage() {
  return (
    <div>
      <PageHeader title="Add Gallery Event" />
      <GalleryEventForm initial={empty} />
    </div>
  );
}
