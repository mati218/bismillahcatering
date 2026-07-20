'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Checkbox, Field, Input, Select, Textarea } from '@/components/admin/ui';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useToast } from '@/components/admin/toast/ToastProvider';

export interface TestimonialValue {
  name: string;
  location: string;
  rating: number;
  review: string;
  event: string;
  image: string;
  date: string;
  published: boolean;
  order: number;
}

export default function TestimonialForm({
  initial,
  testimonialId,
}: {
  initial: TestimonialValue;
  testimonialId?: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = testimonialId ? `/api/admin/testimonials/${testimonialId}` : '/api/admin/testimonials';
    const method = testimonialId ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(testimonialId ? 'Testimonial updated.' : 'Testimonial created.');
      router.push('/admin/testimonials');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Failed to save testimonial');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Client Name">
            <Input value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} required />
          </Field>
          <Field label="Location">
            <Input value={value.location} onChange={(e) => setValue({ ...value, location: e.target.value })} placeholder="Lahore, Pakistan" />
          </Field>
          <Field label="Event Type">
            <Input value={value.event} onChange={(e) => setValue({ ...value, event: e.target.value })} placeholder="Wedding Ceremony" required />
          </Field>
          <Field label="Date">
            <Input value={value.date} onChange={(e) => setValue({ ...value, date: e.target.value })} placeholder="March 2024" />
          </Field>
          <Field label="Rating">
            <Select value={value.rating} onChange={(e) => setValue({ ...value, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
            </Select>
          </Field>
          <Field label="Order">
            <Input type="number" value={value.order} onChange={(e) => setValue({ ...value, order: Number(e.target.value) })} />
          </Field>
        </div>

        <Field label="Review">
          <Textarea rows={4} value={value.review} onChange={(e) => setValue({ ...value, review: e.target.value })} required />
        </Field>

        <ImageUploadField label="Client Photo" value={value.image} onChange={(url) => setValue({ ...value, image: url })} />

        <Checkbox label="Published" checked={value.published} onChange={(e) => setValue({ ...value, published: e.target.checked })} />
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Testimonial'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/testimonials')}>Cancel</Button>
      </div>
    </form>
  );
}
