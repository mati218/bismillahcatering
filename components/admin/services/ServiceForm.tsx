'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Card, Checkbox, Field, Input, Select, Textarea } from '@/components/admin/ui';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useToast } from '@/components/admin/toast/ToastProvider';
import { deleteUploadedImage } from '@/lib/deleteUploadedImage';

export interface ServiceGalleryValue {
  src: string;
  alt: string;
  type: 'image' | 'video';
}

export interface ServiceHighlightValue {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceValue {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  startingPrice: string;
  features: string[];
  idealFor: string[];
  order: number;
  published: boolean;
  gallery: ServiceGalleryValue[];
  highlights: ServiceHighlightValue[];
}

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ServiceForm({ initial, serviceId }: { initial: ServiceValue; serviceId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  const updateGallery = (i: number, patch: Partial<ServiceGalleryValue>) =>
    setValue({ ...value, gallery: value.gallery.map((g, idx) => (idx === i ? { ...g, ...patch } : g)) });
  const addGalleryItem = () => setValue({ ...value, gallery: [...value.gallery, { src: '', alt: '', type: 'image' }] });
  const removeGalleryItem = (i: number) => {
    deleteUploadedImage(value.gallery[i]?.src);
    setValue({ ...value, gallery: value.gallery.filter((_, idx) => idx !== i) });
  };

  const updateHighlight = (i: number, patch: Partial<ServiceHighlightValue>) =>
    setValue({ ...value, highlights: value.highlights.map((h, idx) => (idx === i ? { ...h, ...patch } : h)) });
  const addHighlight = () => setValue({ ...value, highlights: [...value.highlights, { icon: 'FaStar', title: '', description: '' }] });
  const removeHighlight = (i: number) => setValue({ ...value, highlights: value.highlights.filter((_, idx) => idx !== i) });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = serviceId ? `/api/admin/services/${serviceId}` : '/api/admin/services';
    const method = serviceId ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(serviceId ? 'Service updated.' : 'Service created.');
      router.push('/admin/services');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Failed to save service');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title">
            <Input
              value={value.title}
              onChange={(e) => {
                const title = e.target.value;
                setValue({ ...value, title, slug: serviceId ? value.slug : slugify(title) });
              }}
              required
            />
          </Field>
          <Field label="Slug">
            <Input value={value.slug} onChange={(e) => setValue({ ...value, slug: slugify(e.target.value) })} required />
          </Field>
          <Field label="Icon name (react-icons/fa)">
            <Input value={value.icon} onChange={(e) => setValue({ ...value, icon: e.target.value })} placeholder="FaRing" required />
          </Field>
          <Field label="Starting Price">
            <Input value={value.startingPrice} onChange={(e) => setValue({ ...value, startingPrice: e.target.value })} placeholder="PKR 2,50,000" />
          </Field>
          <Field label="Order">
            <Input type="number" value={value.order} onChange={(e) => setValue({ ...value, order: Number(e.target.value) })} />
          </Field>
        </div>

        <Field label="Short Description">
          <Textarea rows={2} value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })} required />
        </Field>
        <Field label="Long Description">
          <Textarea rows={4} value={value.longDescription} onChange={(e) => setValue({ ...value, longDescription: e.target.value })} />
        </Field>

        <ImageUploadField label="Cover Image" value={value.image} onChange={(url) => setValue({ ...value, image: url })} />

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Features (comma separated)">
            <Input
              value={value.features.join(', ')}
              onChange={(e) => setValue({ ...value, features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              placeholder="Venue Selection, Theme Design"
            />
          </Field>
          <Field label="Ideal For (comma separated)">
            <Input
              value={value.idealFor.join(', ')}
              onChange={(e) => setValue({ ...value, idealFor: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              placeholder="Barat, Walima"
            />
          </Field>
        </div>

        <Checkbox label="Published" checked={value.published} onChange={(e) => setValue({ ...value, published: e.target.checked })} />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark">Gallery</h3>
          <Button type="button" variant="secondary" onClick={addGalleryItem}><FaPlus /> Add Image</Button>
        </div>
        <div className="space-y-4">
          {value.gallery.map((g, i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex-1 space-y-2">
                <ImageUploadField label={`Image ${i + 1}`} value={g.src} onChange={(url) => updateGallery(i, { src: url })} />
                <div className="grid sm:grid-cols-2 gap-2">
                  <Input value={g.alt} onChange={(e) => updateGallery(i, { alt: e.target.value })} placeholder="Alt text" />
                  <Select value={g.type} onChange={(e) => updateGallery(i, { type: e.target.value as 'image' | 'video' })}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </Select>
                </div>
              </div>
              <button type="button" onClick={() => removeGalleryItem(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg mt-6">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
          {value.gallery.length === 0 && <p className="text-sm text-dark/40">No gallery images added yet.</p>}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark">Highlights</h3>
          <Button type="button" variant="secondary" onClick={addHighlight}><FaPlus /> Add Highlight</Button>
        </div>
        <div className="space-y-3">
          {value.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex-1 grid sm:grid-cols-3 gap-2">
                <Input value={h.icon} onChange={(e) => updateHighlight(i, { icon: e.target.value })} placeholder="Icon (FaCalendar)" />
                <Input value={h.title} onChange={(e) => updateHighlight(i, { title: e.target.value })} placeholder="Title" />
                <Input value={h.description} onChange={(e) => updateHighlight(i, { description: e.target.value })} placeholder="Description" />
              </div>
              <button type="button" onClick={() => removeHighlight(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
          {value.highlights.length === 0 && <p className="text-sm text-dark/40">No highlights added yet.</p>}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Service'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/services')}>Cancel</Button>
      </div>
    </form>
  );
}
