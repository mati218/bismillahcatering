'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Card, Checkbox, Field, Input } from '@/components/admin/ui';
import { useToast } from '@/components/admin/toast/ToastProvider';

export interface PackageFeatureValue {
  text: string;
  included: boolean;
}

export interface PackageValue {
  name: string;
  tier: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured: boolean;
  badge: string;
  color: string;
  order: number;
  features: PackageFeatureValue[];
}

export default function PackageForm({ initial, packageId }: { initial: PackageValue; packageId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  const updateFeature = (i: number, patch: Partial<PackageFeatureValue>) => {
    setValue({
      ...value,
      features: value.features.map((f, idx) => (idx === i ? { ...f, ...patch } : f)),
    });
  };

  const addFeature = () =>
    setValue({ ...value, features: [...value.features, { text: '', included: true }] });

  const removeFeature = (i: number) =>
    setValue({ ...value, features: value.features.filter((_, idx) => idx !== i) });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = packageId ? `/api/admin/packages/${packageId}` : '/api/admin/packages';
    const method = packageId ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(packageId ? 'Package updated.' : 'Package created.');
      router.push('/admin/packages');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Failed to save package');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} required />
          </Field>
          <Field label="Tier key">
            <Input value={value.tier} onChange={(e) => setValue({ ...value, tier: e.target.value })} placeholder="gold" required />
          </Field>
          <Field label="Tagline">
            <Input value={value.tagline} onChange={(e) => setValue({ ...value, tagline: e.target.value })} placeholder="Popular Choice" />
          </Field>
          <Field label="Badge (optional)">
            <Input value={value.badge} onChange={(e) => setValue({ ...value, badge: e.target.value })} placeholder="Most Popular" />
          </Field>
          <Field label="Price">
            <Input value={value.price} onChange={(e) => setValue({ ...value, price: e.target.value })} placeholder="PKR 3,50,000" required />
          </Field>
          <Field label="Price Note">
            <Input value={value.priceNote} onChange={(e) => setValue({ ...value, priceNote: e.target.value })} placeholder="Starting from" />
          </Field>
          <Field label="Color">
            <Input type="color" className="w-16 h-10 p-1" value={value.color} onChange={(e) => setValue({ ...value, color: e.target.value })} />
          </Field>
          <Field label="Order">
            <Input type="number" value={value.order} onChange={(e) => setValue({ ...value, order: Number(e.target.value) })} />
          </Field>
        </div>
        <Checkbox label="Featured (highlighted package)" checked={value.featured} onChange={(e) => setValue({ ...value, featured: e.target.checked })} />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark">Features</h3>
          <Button type="button" variant="secondary" onClick={addFeature}><FaPlus /> Add Feature</Button>
        </div>
        <div className="space-y-2">
          {value.features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <Checkbox label="" checked={f.included} onChange={(e) => updateFeature(i, { included: e.target.checked })} />
              <Input
                value={f.text}
                onChange={(e) => updateFeature(i, { text: e.target.value })}
                placeholder="Feature text"
                className="flex-1"
              />
              <button type="button" onClick={() => removeFeature(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
          {value.features.length === 0 && <p className="text-sm text-dark/40">No features added yet.</p>}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Package'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/packages')}>Cancel</Button>
      </div>
    </form>
  );
}
