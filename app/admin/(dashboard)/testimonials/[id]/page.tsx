import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/ui';
import TestimonialForm from '@/components/admin/testimonials/TestimonialForm';

export const metadata = { title: 'Edit Testimonial' };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <PageHeader title="Edit Testimonial" />
      <TestimonialForm testimonialId={id} initial={testimonial} />
    </div>
  );
}
