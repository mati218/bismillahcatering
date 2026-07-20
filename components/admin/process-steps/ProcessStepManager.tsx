'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { Button, Card, Field, Input, Textarea, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';
import { useToast } from '@/components/admin/toast/ToastProvider';

interface Step {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
}

const empty = { number: '01', icon: 'FaPhone', title: '', description: '', color: '#F6C945', order: 0 };

function FormFields({ value, onChange }: { value: typeof empty; onChange: (v: typeof empty) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Step #">
          <Input value={value.number} onChange={(e) => onChange({ ...value, number: e.target.value })} placeholder="01" required />
        </Field>
        <Field label="Title">
          <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} required />
        </Field>
        <Field label="Icon name (react-icons/fa)">
          <Input value={value.icon} onChange={(e) => onChange({ ...value, icon: e.target.value })} placeholder="FaPhone" required />
        </Field>
      </div>
      <Field label="Description">
        <Textarea rows={2} value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} required />
      </Field>
      <div className="flex gap-6">
        <Field label="Color">
          <Input type="color" className="w-16 h-10 p-1" value={value.color} onChange={(e) => onChange({ ...value, color: e.target.value })} />
        </Field>
        <Field label="Order">
          <Input type="number" className="w-24" value={value.order} onChange={(e) => onChange({ ...value, order: Number(e.target.value) })} />
        </Field>
      </div>
    </div>
  );
}

export default function ProcessStepManager({ initial }: { initial: Step[] }) {
  const router = useRouter();
  const toast = useToast();
  const [items, setItems] = useState(initial);
  const [creating, setCreating] = useState(false);
  const [newItem, setNewItem] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(empty);
  const [saving, setSaving] = useState(false);

  const create = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/process-steps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setSaving(false);
    if (res.ok) {
      setItems([...items, await res.json()]);
      setNewItem(empty);
      setCreating(false);
      toast.success('Step created.');
    } else toast.error('Failed to create');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    const res = await fetch(`/api/admin/process-steps/${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editValue),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map((i) => (i.id === editingId ? updated : i)));
      setEditingId(null);
      toast.success('Step updated.');
    } else toast.error('Failed to save');
  };

  return (
    <div className="space-y-4">
      {!creating && (
        <Button onClick={() => { setCreating(true); setEditingId(null); }}>
          <FaPlus /> Add Step
        </Button>
      )}

      {creating && (
        <Card className="p-5">
          <FormFields value={newItem} onChange={setNewItem} />
          <div className="flex gap-2 mt-4">
            <Button onClick={create} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {items.length === 0 && !creating ? (
        <Card><EmptyState message="No process steps yet." /></Card>
      ) : (
        <div className="space-y-3">
          {items.slice().sort((a, b) => a.order - b.order).map((item) =>
            editingId === item.id ? (
              <Card key={item.id} className="p-5">
                <FormFields value={editValue} onChange={setEditValue} />
                <div className="flex gap-2 mt-4">
                  <Button onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                  <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </Card>
            ) : (
              <Card key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.number}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-dark">{item.title}</p>
                    <p className="text-sm text-dark/50 line-clamp-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => { setEditingId(item.id); setEditValue(item); setCreating(false); }}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  <DeleteButton
                    url={`/api/admin/process-steps/${item.id}`}
                    onDeleted={() => { setItems(items.filter((i) => i.id !== item.id)); router.refresh(); }}
                  />
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
