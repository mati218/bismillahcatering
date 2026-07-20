'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { Button, Card, Checkbox, Field, Input, Textarea, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
}

const empty = { question: '', answer: '', order: 0, published: true };

function FaqFormFields({
  value,
  onChange,
}: {
  value: typeof empty;
  onChange: (v: typeof empty) => void;
}) {
  return (
    <div className="space-y-3">
      <Field label="Question">
        <Input value={value.question} onChange={(e) => onChange({ ...value, question: e.target.value })} required />
      </Field>
      <Field label="Answer">
        <Textarea rows={3} value={value.answer} onChange={(e) => onChange({ ...value, answer: e.target.value })} required />
      </Field>
      <div className="flex items-center gap-6">
        <Field label="Order">
          <Input type="number" className="w-24" value={value.order} onChange={(e) => onChange({ ...value, order: Number(e.target.value) })} />
        </Field>
        <div className="pt-6">
          <Checkbox label="Published" checked={value.published} onChange={(e) => onChange({ ...value, published: e.target.checked })} />
        </div>
      </div>
    </div>
  );
}

export default function FaqManager({ initial }: { initial: Faq[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [creating, setCreating] = useState(false);
  const [newFaq, setNewFaq] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(empty);
  const [saving, setSaving] = useState(false);

  const startEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setEditValue(faq);
    setCreating(false);
  };

  const createFaq = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFaq),
    });
    setSaving(false);
    if (res.ok) {
      const created = await res.json();
      setItems([...items, created]);
      setNewFaq(empty);
      setCreating(false);
    } else {
      window.alert('Failed to create FAQ');
    }
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    const res = await fetch(`/api/admin/faqs/${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editValue),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map((i) => (i.id === editingId ? updated : i)));
      setEditingId(null);
    } else {
      window.alert('Failed to save FAQ');
    }
  };

  return (
    <div className="space-y-4">
      {!creating && (
        <Button onClick={() => { setCreating(true); setEditingId(null); }}>
          <FaPlus /> Add FAQ
        </Button>
      )}

      {creating && (
        <Card className="p-5">
          <FaqFormFields value={newFaq} onChange={setNewFaq} />
          <div className="flex gap-2 mt-4">
            <Button onClick={createFaq} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            <Button variant="secondary" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {items.length === 0 && !creating ? (
        <Card><EmptyState message="No FAQs yet." /></Card>
      ) : (
        <div className="space-y-3">
          {items
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((faq) =>
              editingId === faq.id ? (
                <Card key={faq.id} className="p-5">
                  <FaqFormFields value={editValue} onChange={setEditValue} />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                    <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </Card>
              ) : (
                <Card key={faq.id} className="p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-dark">{faq.question}</p>
                    <p className="text-sm text-dark/50 mt-1 line-clamp-2">{faq.answer}</p>
                    {!faq.published && (
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-dark/50">Hidden</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(faq)}
                      title="Edit"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors"
                    >
                      <FaEdit className="text-xs" />
                    </button>
                    <DeleteButton
                      url={`/api/admin/faqs/${faq.id}`}
                      onDeleted={() => {
                        setItems(items.filter((i) => i.id !== faq.id));
                        router.refresh();
                      }}
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
