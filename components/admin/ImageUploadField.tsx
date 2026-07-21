'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { FaCloudUploadAlt, FaSpinner, FaTrash } from 'react-icons/fa';
import { deleteUploadedImage } from '@/lib/deleteUploadedImage';

export default function ImageUploadField({
  value,
  onChange,
  label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    const previousValue = value;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/uploads', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
      if (previousValue && previousValue !== data.url) deleteUploadedImage(previousValue);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const openPicker = () => inputRef.current?.click();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPicker();
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteUploadedImage(value);
    onChange('');
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-dark/70 mb-1.5">{label}</label>
      <div className="flex items-start gap-4">
        <div className="relative w-24 h-24 shrink-0">
          <div
            role="button"
            tabIndex={0}
            onClick={openPicker}
            onKeyDown={onKeyDown}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            title={value ? 'Click to replace image' : 'Click to upload an image'}
            className={`group absolute inset-0 rounded-lg overflow-hidden cursor-pointer border-2 border-dashed transition-colors flex items-center justify-center ${
              dragOver ? 'border-gold-500 bg-gold-500/10' : 'border-gray-300 hover:border-gold-500 bg-gray-50'
            }`}
          >
            {value ? (
              <>
                <Image src={value} alt="" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-[11px] font-medium transition-opacity">
                    Change
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1 text-dark/40 group-hover:text-gold-600 px-2 transition-colors">
                <FaCloudUploadAlt className="text-2xl" />
                <span className="text-[10px] text-center leading-tight">Click or drop to upload</span>
              </div>
            )}

            {uploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <FaSpinner className="animate-spin text-dark/50" />
              </div>
            )}
          </div>

          {value && (
            <button
              type="button"
              onClick={removeImage}
              title="Remove image"
              className="cursor-pointer absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-colors"
            >
              <FaTrash className="text-[10px]" />
            </button>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL, or click the box to upload"
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}
