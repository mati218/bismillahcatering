'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt, FaConciergeBell, FaBoxOpen, FaImages, FaCommentDots,
  FaGem, FaListOl, FaQuestionCircle, FaShareAlt, FaCog,
  FaInbox, FaAddressBook, FaFileInvoiceDollar,
} from 'react-icons/fa';

const navGroups = [
  {
    label: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: FaTachometerAlt }],
  },
  {
    label: 'Site Content',
    items: [
      { href: '/admin/services', label: 'Services', icon: FaConciergeBell },
      { href: '/admin/packages', label: 'Packages', icon: FaBoxOpen },
      { href: '/admin/gallery', label: 'Gallery', icon: FaImages },
      { href: '/admin/testimonials', label: 'Testimonials', icon: FaCommentDots },
      { href: '/admin/why-choose-us', label: 'Why Choose Us', icon: FaGem },
      { href: '/admin/process-steps', label: 'Process Steps', icon: FaListOl },
      { href: '/admin/faqs', label: 'FAQs', icon: FaQuestionCircle },
      { href: '/admin/social-links', label: 'Social Links', icon: FaShareAlt },
      { href: '/admin/settings', label: 'Site Settings', icon: FaCog },
    ],
  },
  {
    label: 'CRM',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: FaInbox },
      { href: '/admin/clients', label: 'Clients', icon: FaAddressBook },
      { href: '/admin/quotations', label: 'Quotations', icon: FaFileInvoiceDollar },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#0d0900] text-white h-screen sticky top-0 overflow-y-auto">
      <div className="px-5 py-6 border-b border-white/10">
        <span className="font-heading text-lg font-bold text-white block">Bismillah</span>
        <span className="text-[#F6C945] text-xs tracking-[0.2em] uppercase">Admin Panel</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/35 mb-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-[#F6C945] text-[#0d0900] font-semibold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="text-sm shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
