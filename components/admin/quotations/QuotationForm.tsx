'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Card, Field, Input, Select, Textarea } from '@/components/admin/ui';

export interface QuotationItemValue {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface QuotationValue {
  clientId: string;
  title: string;
  status: string;
  validUntil: string;
  notes: string;
  discount: number;
  tax: number;
  items: QuotationItemValue[];
}

interface ClientOption {
  id: string;
  name: string;
  phone: string;
}

const statuses = ['draft', 'sent', 'accepted', 'rejected', 'expired'];

export default function QuotationForm({
  initial,
  quotationId,
  clients,
  shareUrl,
}: {
  initial: QuotationValue;
  quotationId?: string;
  clients: ClientOption[];
  shareUrl?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const updateItem = (i: number, patch: Partial<QuotationItemValue>) =>
    setValue({ ...value, items: value.items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)) });
  const addItem = () => setValue({ ...value, items: [...value.items, { description: '', quantity: 1, unitPrice: 0 }] });
  const removeItem = (i: number) => setValue({ ...value, items: value.items.filter((_, idx) => idx !== i) });

  const subtotal = value.items.reduce((sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.unitPrice) || 0), 0);
  const total = Math.max(0, subtotal - (Number(value.discount) || 0) + (Number(value.tax) || 0));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const url = quotationId ? `/api/admin/quotations/${quotationId}` : '/api/admin/quotations';
    const method = quotationId ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    setSaving(false);
    if (res.ok) {
      const q = await res.json();
      router.push(`/admin/quotations/${q.id}`);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Failed to save quotation');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Client">
            <Select value={value.clientId} onChange={(e) => setValue({ ...value, clientId: e.target.value })} required>
              <option value="">Select a client</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>)}
            </Select>
          </Field>
          <Field label="Title">
            <Input value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} placeholder="Walima Package Quote" required />
          </Field>
          <Field label="Status">
            <Select value={value.status} onChange={(e) => setValue({ ...value, status: e.target.value })}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
          <Field label="Valid Until">
            <Input type="date" value={value.validUntil} onChange={(e) => setValue({ ...value, validUntil: e.target.value })} />
          </Field>
        </div>
        <Field label="Notes">
          <Textarea rows={3} value={value.notes} onChange={(e) => setValue({ ...value, notes: e.target.value })} placeholder="Terms, payment schedule, or additional notes for the client..." />
        </Field>
        {shareUrl && (
          <Field label="Public Share Link">
            <div className="flex gap-2">
              <Input readOnly value={shareUrl} />
              <Button type="button" variant="secondary" onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy</Button>
              <Button type="button" variant="secondary" onClick={() => window.open(shareUrl, '_blank')}>Open</Button>
            </div>
          </Field>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark">Line Items</h3>
          <Button type="button" variant="secondary" onClick={addItem}><FaPlus /> Add Item</Button>
        </div>
        <div className="space-y-3">
          {value.items.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_90px_120px_120px_auto] gap-2 items-center">
              <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Description" />
              <Input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })} placeholder="Qty" />
              <Input type="number" min={0} value={item.unitPrice} onChange={(e) => updateItem(i, { unitPrice: Number(e.target.value) })} placeholder="Unit Price" />
              <p className="text-sm text-dark/60 text-right">PKR {((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)).toLocaleString()}</p>
              <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
          {value.items.length === 0 && <p className="text-sm text-dark/40">No line items added yet.</p>}
        </div>

        <div className="mt-6 flex flex-col items-end gap-2 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-dark/60">Subtotal</span>
            <span className="font-medium text-dark w-32 text-right">PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-dark/60">Discount</span>
            <Input type="number" min={0} className="w-32 text-right" value={value.discount} onChange={(e) => setValue({ ...value, discount: Number(e.target.value) })} />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-dark/60">Tax</span>
            <Input type="number" min={0} className="w-32 text-right" value={value.tax} onChange={(e) => setValue({ ...value, tax: Number(e.target.value) })} />
          </div>
          <div className="flex items-center gap-3 text-base font-semibold">
            <span className="text-dark">Total</span>
            <span className="text-dark w-32 text-right">PKR {total.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Quotation'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/quotations')}>Cancel</Button>
      </div>
    </form>
  );
}
