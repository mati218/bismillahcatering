'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUploadField({
  value,
  onChange,
  label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/uploads', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-dark/70 mb-1.5">{label}</label>
      <div className="flex items-start gap-4">
        {value && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL, or upload a file below"
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#F6C945]/40 focus:border-[#F6C945]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
            className="text-xs text-dark/60"
          />
          {uploading && <p className="text-xs text-dark/50 mt-1">Uploading...</p>}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
