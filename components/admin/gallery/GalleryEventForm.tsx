'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Card, Checkbox, Field, Input, Textarea } from '@/components/admin/ui';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useToast } from '@/components/admin/toast/ToastProvider';

export interface GalleryImageValue {
  src: string;
  caption: string;
}

export interface GalleryEventValue {
  title: string;
  category: string;
  cover: string;
  description: string;
  date: string;
  featured: boolean;
  order: number;
  images: GalleryImageValue[];
}

export default function GalleryEventForm({ initial, eventId }: { initial: GalleryEventValue; eventId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  const updateImage = (i: number, patch: Partial<GalleryImageValue>) =>
    setValue({ ...value, images: value.images.map((img, idx) => (idx === i ? { ...img, ...patch } : img)) });

  const addImage = () => setValue({ ...value, images: [...value.images, { src: '', caption: '' }] });
  const removeImage = (i: number) => setValue({ ...value, images: value.images.filter((_, idx) => idx !== i) });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = eventId ? `/api/admin/gallery/${eventId}` : '/api/admin/gallery';
    const method = eventId ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(eventId ? 'Gallery event updated.' : 'Gallery event created.');
      router.push('/admin/gallery');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Failed to save gallery event');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title">
            <Input value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} required />
          </Field>
          <Field label="Category">
            <Input value={value.category} onChange={(e) => setValue({ ...value, category: e.target.value })} placeholder="wedding" required />
          </Field>
          <Field label="Date">
            <Input value={value.date} onChange={(e) => setValue({ ...value, date: e.target.value })} placeholder="March 2024" />
          </Field>
          <Field label="Order">
            <Input type="number" value={value.order} onChange={(e) => setValue({ ...value, order: Number(e.target.value) })} />
          </Field>
        </div>

        <Field label="Description">
          <Textarea rows={2} value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })} />
        </Field>

        <ImageUploadField label="Cover Image" value={value.cover} onChange={(url) => setValue({ ...value, cover: url })} />

        <Checkbox label="Featured" checked={value.featured} onChange={(e) => setValue({ ...value, featured: e.target.checked })} />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark">Photos</h3>
          <Button type="button" variant="secondary" onClick={addImage}><FaPlus /> Add Photo</Button>
        </div>
        <div className="space-y-4">
          {value.images.map((img, i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex-1 space-y-2">
                <ImageUploadField label={`Photo ${i + 1}`} value={img.src} onChange={(url) => updateImage(i, { src: url })} />
                <Input
                  value={img.caption}
                  onChange={(e) => updateImage(i, { caption: e.target.value })}
                  placeholder="Caption (optional)"
                />
              </div>
              <button type="button" onClick={() => removeImage(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg mt-6">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
          {value.images.length === 0 && <p className="text-sm text-dark/40">No photos added yet.</p>}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Gallery Event'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/gallery')}>Cancel</Button>
      </div>
    </form>
  );
}
