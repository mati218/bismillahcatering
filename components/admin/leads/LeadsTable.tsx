'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import { Select, EmptyState } from '@/components/admin/ui';
import DeleteButton from '@/components/admin/DeleteButton';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string | null;
  guests: string | null;
  message: string;
  source: string;
  status: string;
  clientId: string | null;
}

const statuses = ['new', 'contacted', 'converted', 'closed'];

export default function LeadsTable({ initial }: { initial: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initial);
  const [converting, setConverting] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setLeads(leads.map((l) => (l.id === id ? updated : l)));
    }
  };

  const convertToClient = async (id: string) => {
    setConverting(id);
    const res = await fetch(`/api/admin/leads/${id}/convert`, { method: 'POST' });
    setConverting(null);
    if (res.ok) {
      const updated = await res.json();
      setLeads(leads.map((l) => (l.id === id ? updated : l)));
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      window.alert(data.error || 'Failed to convert lead');
    }
  };

  if (leads.length === 0) {
    return <EmptyState message="No leads yet — submissions from the booking and contact forms will show up here." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-dark/40 border-b border-gray-100">
            <th className="px-5 py-3 font-medium">Name / Contact</th>
            <th className="px-5 py-3 font-medium">Event</th>
            <th className="px-5 py-3 font-medium">Message</th>
            <th className="px-5 py-3 font-medium">Source</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-gray-50 last:border-0 align-top">
              <td className="px-5 py-3">
                <p className="font-medium text-dark">{lead.name}</p>
                <p className="text-dark/50 text-xs">{lead.phone}</p>
                <p className="text-dark/50 text-xs">{lead.email}</p>
              </td>
              <td className="px-5 py-3 text-dark/70">
                {lead.eventType}
                {lead.eventDate && <p className="text-dark/40 text-xs">{lead.eventDate}</p>}
                {lead.guests && <p className="text-dark/40 text-xs">{lead.guests} guests</p>}
              </td>
              <td className="px-5 py-3 text-dark/60 max-w-xs">
                <p className="line-clamp-2">{lead.message}</p>
              </td>
              <td className="px-5 py-3 text-dark/60 capitalize">{lead.source}</td>
              <td className="px-5 py-3">
                <Select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="py-1.5! px-2! text-xs"
                >
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
              </td>
              <td className="px-5 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  {lead.clientId ? (
                    <Link href={`/admin/clients/${lead.clientId}`} className="inline-flex items-center gap-1 text-green-600 text-xs font-medium hover:underline">
                      <FaCheckCircle /> Client
                    </Link>
                  ) : (
                    <button
                      onClick={() => convertToClient(lead.id)}
                      disabled={converting === lead.id}
                      title="Convert to Client"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-dark/60 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <FaUserPlus className="text-xs" />
                    </button>
                  )}
                  <DeleteButton
                    url={`/api/admin/leads/${lead.id}`}
                    onDeleted={() => { setLeads(leads.filter((l) => l.id !== lead.id)); router.refresh(); }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
