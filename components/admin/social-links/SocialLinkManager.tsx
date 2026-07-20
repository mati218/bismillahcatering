'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { Button, Card, Checkbox, Field, Input, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
  enabled: boolean;
}

const empty = { platform: '', url: '', icon: 'FaFacebook', order: 0, enabled: true };

function FormFields({ value, onChange }: { value: typeof empty; onChange: (v: typeof empty) => void }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Field label="Platform">
        <Input value={value.platform} onChange={(e) => onChange({ ...value, platform: e.target.value })} placeholder="Facebook" required />
      </Field>
      <Field label="Icon name (react-icons/fa)">
        <Input value={value.icon} onChange={(e) => onChange({ ...value, icon: e.target.value })} placeholder="FaFacebook" required />
      </Field>
      <Field label="URL">
        <Input value={value.url} onChange={(e) => onChange({ ...value, url: e.target.value })} placeholder="https://facebook.com/..." required />
      </Field>
      <div className="flex items-end gap-6">
        <Field label="Order">
          <Input type="number" className="w-24" value={value.order} onChange={(e) => onChange({ ...value, order: Number(e.target.value) })} />
        </Field>
        <div className="pb-2.5">
          <Checkbox label="Enabled" checked={value.enabled} onChange={(e) => onChange({ ...value, enabled: e.target.checked })} />
        </div>
      </div>
    </div>
  );
}

export default function SocialLinkManager({ initial }: { initial: SocialLink[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [creating, setCreating] = useState(false);
  const [newLink, setNewLink] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(empty);
  const [saving, setSaving] = useState(false);

  const createLink = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/social-links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLink),
    });
    setSaving(false);
    if (res.ok) {
      setItems([...items, await res.json()]);
      setNewLink(empty);
      setCreating(false);
    } else window.alert('Failed to create social link');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    const res = await fetch(`/api/admin/social-links/${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editValue),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map((i) => (i.id === editingId ? updated : i)));
      setEditingId(null);
    } else window.alert('Failed to save social link');
  };

  return (
    <div className="space-y-4">
      {!creating && (
        <Button onClick={() => { setCreating(true); setEditingId(null); }}>
          <FaPlus /> Add Social Link
        </Button>
      )}

      {creating && (
        <Card className="p-5">
          <FormFields value={newLink} onChange={setNewLink} />
          <div className="flex gap-2 mt-4">
            <Button onClick={createLink} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {items.length === 0 && !creating ? (
        <Card><EmptyState message="No social links yet." /></Card>
      ) : (
        <div className="space-y-3">
          {items.slice().sort((a, b) => a.order - b.order).map((link) =>
            editingId === link.id ? (
              <Card key={link.id} className="p-5">
                <FormFields value={editValue} onChange={setEditValue} />
                <div className="flex gap-2 mt-4">
                  <Button onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                  <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </Card>
            ) : (
              <Card key={link.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-dark">{link.platform} <span className="text-dark/40 text-xs">({link.icon})</span></p>
                  <p className="text-sm text-dark/50 truncate">{link.url}</p>
                  {!link.enabled && <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-dark/50">Disabled</span>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => { setEditingId(link.id); setEditValue(link); setCreating(false); }}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  <DeleteButton
                    url={`/api/admin/social-links/${link.id}`}
                    onDeleted={() => { setItems(items.filter((i) => i.id !== link.id)); router.refresh(); }}
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
