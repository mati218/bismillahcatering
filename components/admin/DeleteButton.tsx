'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

export default function DeleteButton({
  url,
  confirmMessage = 'Are you sure you want to delete this? This cannot be undone.',
  onDeleted,
}: {
  url: string;
  confirmMessage?: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!window.confirm(confirmMessage)) return;
    setLoading(true);
    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        window.alert(data.error || 'Failed to delete');
        setLoading(false);
        return;
      }
      if (onDeleted) onDeleted();
      else router.refresh();
    } catch {
      window.alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="Delete"
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      <FaTrash className="text-xs" />
    </button>
  );
}
