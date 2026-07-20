'use client';

import { useState } from 'react';
import { Button, Card, Field, Input, Textarea } from '@/components/admin/ui';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useToast } from '@/components/admin/toast/ToastProvider';

export interface SettingsValue {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapUrl: string;
  logoUrl: string;
  ogImageUrl: string;
  aboutText: string;
  foundedYear: number;
}

export default function SettingsForm({ initial }: { initial: SettingsValue }) {
  const toast = useToast();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Settings saved.');
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Failed to save settings');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Company Name">
            <Input value={value.companyName} onChange={(e) => setValue({ ...value, companyName: e.target.value })} required />
          </Field>
          <Field label="Founded Year">
            <Input type="number" value={value.foundedYear} onChange={(e) => setValue({ ...value, foundedYear: Number(e.target.value) })} />
          </Field>
          <Field label="Phone">
            <Input value={value.phone} onChange={(e) => setValue({ ...value, phone: e.target.value })} placeholder="+92-300-0000000" required />
          </Field>
          <Field label="WhatsApp Number">
            <Input value={value.whatsapp} onChange={(e) => setValue({ ...value, whatsapp: e.target.value })} placeholder="923000000000" required />
          </Field>
          <Field label="Email">
            <Input type="email" value={value.email} onChange={(e) => setValue({ ...value, email: e.target.value })} required />
          </Field>
          <Field label="Google Maps URL">
            <Input value={value.googleMapUrl} onChange={(e) => setValue({ ...value, googleMapUrl: e.target.value })} />
          </Field>
        </div>

        <Field label="Address">
          <Textarea rows={2} value={value.address} onChange={(e) => setValue({ ...value, address: e.target.value })} required />
        </Field>

        <Field label="About Text">
          <Textarea rows={4} value={value.aboutText} onChange={(e) => setValue({ ...value, aboutText: e.target.value })} />
        </Field>

        <ImageUploadField label="Logo" value={value.logoUrl} onChange={(url) => setValue({ ...value, logoUrl: url })} />
        <ImageUploadField label="Default Social Share Image" value={value.ogImageUrl} onChange={(url) => setValue({ ...value, ogImageUrl: url })} />
      </Card>

      <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button>
    </form>
  );
}
