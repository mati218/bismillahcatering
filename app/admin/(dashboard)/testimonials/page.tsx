import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PageHeader, LinkButton, Card, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { FaPlus, FaEdit, FaStar } from 'react-icons/fa';

export const metadata = { title: 'Testimonials' };

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage client reviews shown across the site."
        action={<LinkButton href="/admin/testimonials/new"><FaPlus /> Add Testimonial</LinkButton>}
      />

      {testimonials.length === 0 ? (
        <Card><EmptyState message="No testimonials yet." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-5 flex flex-col">
              <div className="flex items-center gap-1 text-[#F6C945] mb-2">
                {Array.from({ length: t.rating }).map((_, i) => <FaStar key={i} className="text-xs" />)}
              </div>
              <p className="text-sm text-dark/70 line-clamp-3 flex-1">&ldquo;{t.review}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark text-sm">{t.name}</p>
                  <p className="text-xs text-dark/40">{t.event}</p>
                  {!t.published && <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-dark/50">Hidden</span>}
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/testimonials/${t.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors"
                  >
                    <FaEdit className="text-xs" />
                  </Link>
                  <DeleteButton url={`/api/admin/testimonials/${t.id}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
