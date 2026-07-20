import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  FaConciergeBell, FaBoxOpen, FaImages, FaCommentDots,
  FaInbox, FaAddressBook, FaFileInvoiceDollar,
} from 'react-icons/fa';

export const metadata = { title: 'Dashboard' };

async function getCounts() {
  const [services, packages, galleryEvents, testimonials, newLeads, clients, quotations] =
    await Promise.all([
      prisma.service.count(),
      prisma.package.count(),
      prisma.galleryEvent.count(),
      prisma.testimonial.count(),
      prisma.lead.count({ where: { status: 'new' } }),
      prisma.client.count(),
      prisma.quotation.count(),
    ]);
  return { services, packages, galleryEvents, testimonials, newLeads, clients, quotations };
}

async function getRecentLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
}

export default async function AdminDashboardPage() {
  const [counts, recentLeads] = await Promise.all([getCounts(), getRecentLeads()]);

  const cards = [
    { label: 'Services', value: counts.services, href: '/admin/services', icon: FaConciergeBell, color: '#3b82f6' },
    { label: 'Packages', value: counts.packages, href: '/admin/packages', icon: FaBoxOpen, color: '#f59e0b' },
    { label: 'Gallery Events', value: counts.galleryEvents, href: '/admin/gallery', icon: FaImages, color: '#8b5cf6' },
    { label: 'Testimonials', value: counts.testimonials, href: '/admin/testimonials', icon: FaCommentDots, color: '#ec4899' },
    { label: 'New Leads', value: counts.newLeads, href: '/admin/leads', icon: FaInbox, color: '#ef4444' },
    { label: 'Clients', value: counts.clients, href: '/admin/clients', icon: FaAddressBook, color: '#14b8a6' },
    { label: 'Quotations', value: counts.quotations, href: '/admin/quotations', icon: FaFileInvoiceDollar, color: '#22c55e' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-dark/50 text-sm mt-1">Overview of your site content and CRM.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${card.color}18`, color: card.color }}
              >
                <Icon />
              </div>
              <p className="text-2xl font-bold text-dark">{card.value}</p>
              <p className="text-sm text-dark/50">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-heading font-semibold text-dark">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-[#c9971f] hover:underline">View all</Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="p-5 text-sm text-dark/50">No leads yet — submissions from the booking and contact forms will show up here.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-dark/40 border-b border-gray-100">
                <th className="px-5 py-2 font-medium">Name</th>
                <th className="px-5 py-2 font-medium">Event Type</th>
                <th className="px-5 py-2 font-medium">Source</th>
                <th className="px-5 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-dark">{lead.name}</td>
                  <td className="px-5 py-3 text-dark/70">{lead.eventType}</td>
                  <td className="px-5 py-3 text-dark/70 capitalize">{lead.source}</td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-gray-100 text-dark/60 capitalize">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
