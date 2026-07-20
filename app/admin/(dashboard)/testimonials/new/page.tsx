import { PageHeader } from '@/components/admin/ui';
import TestimonialForm from '@/components/admin/testimonials/TestimonialForm';

export const metadata = { title: 'Add Testimonial' };

const empty = {
  name: '', location: '', rating: 5, review: '', event: '', image: '', date: '', published: true, order: 0,
};

export default function NewTestimonialPage() {
  return (
    <div>
      <PageHeader title="Add Testimonial" />
      <TestimonialForm initial={empty} />
    </div>
  );
}
