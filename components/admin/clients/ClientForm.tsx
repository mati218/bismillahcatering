'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Field, Input, Textarea } from '@/components/admin/ui';
import { useToast } from '@/components/admin/toast/ToastProvider';

export interface ClientValue {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  source: string;
}

export default function ClientForm({ initial, clientId }: { initial: ClientValue; clientId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = clientId ? `/api/admin/clients/${clientId}` : '/api/admin/clients';
    const method = clientId ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      const client = await res.json();
      toast.success(clientId ? 'Client updated.' : 'Client created.');
      router.push(`/admin/clients/${client.id}`);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Failed to save client');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} required />
          </Field>
          <Field label="Phone">
            <Input value={value.phone} onChange={(e) => setValue({ ...value, phone: e.target.value })} required />
          </Field>
          <Field label="Email">
            <Input type="email" value={value.email} onChange={(e) => setValue({ ...value, email: e.target.value })} />
          </Field>
          <Field label="Source">
            <Input value={value.source} onChange={(e) => setValue({ ...value, source: e.target.value })} placeholder="Referral, Walk-in, Lead..." />
          </Field>
        </div>
        <Field label="Address">
          <Input value={value.address} onChange={(e) => setValue({ ...value, address: e.target.value })} />
        </Field>
        <Field label="Notes">
          <Textarea rows={3} value={value.notes} onChange={(e) => setValue({ ...value, notes: e.target.value })} />
        </Field>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Client'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/clients')}>Cancel</Button>
      </div>
    </form>
  );
}
