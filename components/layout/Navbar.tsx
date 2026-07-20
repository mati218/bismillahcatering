'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  FaBars, FaTimes, FaPhone, FaWhatsapp, FaChevronDown,
  FaRing, FaUtensils, FaStar, FaHome, FaBriefcase,
  FaBirthdayCake, FaPalette, FaCrown, FaGem, FaFire,
  FaMosque, FaHeart, FaBook, FaConciergeBell, FaChevronRight,
} from 'react-icons/fa';
import { GiTheaterCurtains } from 'react-icons/gi';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { getWhatsAppUrl } from '@/lib/utils';
import type { getServices } from '@/lib/data/services';
import type { getSiteSettings } from '@/lib/data/settings';

/* ─── Icon map ─── */
const iconMap: Record<string, React.ElementType> = {
  FaRing, FaUtensils, FaStar, FaHome, FaBriefcase,
  FaBirthdayCake, FaTheaterMasks: GiTheaterCurtains, FaPalette, FaCrown,
  FaGem, FaFire, FaMosque, FaHeart, FaBook, FaConciergeBell,
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasSubmenu: true },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Packages', href: '/packages' },
  { label: 'Contact', href: '/contact' },
];

/* ─── Submenu animation variants ─── */
const submenuVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, y: 8, scale: 0.97,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.035, duration: 0.22 },
  }),
};

interface NavbarProps {
  settings: Awaited<ReturnType<typeof getSiteSettings>>;
  services: Awaited<ReturnType<typeof getServices>>;
}

export default function Navbar({ settings, services }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const submenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progress = useScrollProgress();
  const phone = settings.phone;
  const whatsapp = settings.whatsapp;
  const serviceItems = services.slice(0, 12).map((s) => ({
    label: s.title,
    slug: s.slug,
    icon: s.icon,
    desc: s.description.length > 42 ? `${s.description.slice(0, 42)}...` : s.description,
  }));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSubmenu = () => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    submenuTimeout.current = setTimeout(() => setSubmenuOpen(false), 120);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#F6C945] to-[#e6b830] z-[100] transition-all duration-100"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d0900]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#F6C945] group-hover:border-[#e6b830] group-hover:shadow-[0_0_16px_rgba(246,201,69,0.5)] transition-all duration-300">
              <Image src="/logo.jpg" alt="Bismillah Catering Logo" fill className="object-cover" priority />
            </div>
            <div className="leading-none">
              <span className="block font-heading text-white text-[1.15rem] font-bold tracking-wide">
                Bismillah
              </span>
              <span className="block text-[#F6C945] text-[0.6rem] font-body tracking-[0.22em] uppercase mt-0.5">
                Catering
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.hasSubmenu ? (
                /* Services with submenu */
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openSubmenu}
                  onMouseLeave={closeSubmenu}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium font-body transition-all duration-200
                      ${submenuOpen ? 'text-[#F6C945]' : 'text-white/85 hover:text-[#F6C945]'}`}
                  >
                    {link.label}
                    <motion.span animate={{ rotate: submenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FaChevronDown className="text-[10px] mt-0.5" />
                    </motion.span>
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#F6C945] transition-all duration-300 ${
                        submenuOpen ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>

                  {/* ── Mega Submenu ── */}
                  <AnimatePresence>
                    {submenuOpen && (
                      <motion.div
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={openSubmenu}
                        onMouseLeave={closeSubmenu}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-[#0d0900]/98 backdrop-blur-xl border border-[#F6C945]/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(246,201,69,0.1)] overflow-hidden"
                      >
                        {/* Top bar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F6C945]/15 bg-[#F6C945]/5">
                          <span className="text-[#F6C945] font-heading text-sm font-semibold tracking-wider uppercase">
                            Our Services
                          </span>
                          <Link
                            href="/services"
                            onClick={() => setSubmenuOpen(false)}
                            className="flex items-center gap-1 text-white/50 hover:text-[#F6C945] text-xs font-body transition-colors"
                          >
                            View All <FaChevronRight className="text-[9px]" />
                          </Link>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-px bg-[#F6C945]/10 p-px">
                          {serviceItems.map((item, i) => {
                            const Icon = iconMap[item.icon] || FaStar;
                            return (
                              <motion.div
                                key={item.slug}
                                custom={i}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                <Link
                                  href={`/services/${item.slug}`}
                                  onClick={() => setSubmenuOpen(false)}
                                  className="group/item flex items-start gap-3 p-4 bg-[#0d0900] hover:bg-[#F6C945]/8 transition-all duration-200"
                                >
                                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#F6C945]/10 group-hover/item:bg-[#F6C945]/20 flex items-center justify-center transition-colors duration-200">
                                    <Icon className="text-[#F6C945] text-sm" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-white group-hover/item:text-[#F6C945] text-[0.78rem] font-semibold font-body leading-tight transition-colors duration-200 truncate">
                                      {item.label}
                                    </p>
                                    <p className="text-white/40 group-hover/item:text-white/60 text-[0.68rem] font-body mt-0.5 leading-tight transition-colors duration-200">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Footer CTA */}
                        <div className="px-5 py-3 bg-[#F6C945]/5 border-t border-[#F6C945]/15 flex items-center justify-between">
                          <p className="text-white/40 text-xs font-body">
                            {services.length}+ premium services available
                          </p>
                          <Link
                            href="/booking"
                            onClick={() => setSubmenuOpen(false)}
                            className="flex items-center gap-1.5 bg-[#F6C945] hover:bg-[#e6b830] text-[#0d0900] text-xs font-semibold font-body px-4 py-1.5 rounded-full transition-colors duration-200"
                          >
                            <FaWhatsapp />
                            Book a Service
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Regular nav link */
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-white/85 hover:text-[#F6C945] font-body text-sm font-medium transition-colors duration-200 rounded-md group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-3 w-0 h-[2px] bg-[#F6C945] group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-white/70 hover:text-[#F6C945] transition-colors text-sm font-body"
              aria-label="Call us"
            >
              <FaPhone className="text-[#F6C945] text-xs" />
              <span className="hidden xl:inline">{phone}</span>
            </a>
            <motion.a
              href={getWhatsAppUrl(whatsapp, 'Hello! I want to book an event.')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(246,201,69,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-[#F6C945] hover:bg-[#e6b830] text-[#0d0900] font-semibold px-5 py-2.5 rounded-full text-sm transition-colors font-body shadow-[0_4px_18px_rgba(246,201,69,0.3)]"
              aria-label="Book via WhatsApp"
            >
              <FaWhatsapp className="text-base" />
              Book Now
            </motion.a>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2 hover:text-[#F6C945] transition-colors rounded-md"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-[#0d0900]/98 backdrop-blur-xl border-t border-[#F6C945]/20 overflow-hidden"
            >
              <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1" aria-label="Mobile Navigation">
                {navLinks.map((link, i) =>
                  link.hasSubmenu ? (
                    <div key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full flex items-center justify-between text-white/90 hover:text-[#F6C945] font-body font-medium text-base py-3 border-b border-white/10 transition-colors"
                        >
                          {link.label}
                          <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }}>
                            <FaChevronDown className="text-[#F6C945] text-xs" />
                          </motion.span>
                        </button>
                      </motion.div>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden bg-[#F6C945]/5 rounded-xl mt-1 mb-2"
                          >
                            <div className="grid grid-cols-2 gap-px p-2">
                              {serviceItems.map((item) => {
                                const Icon = iconMap[item.icon] || FaStar;
                                return (
                                  <Link
                                    key={item.slug}
                                    href={`/services/${item.slug}`}
                                    onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                                    className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-[#F6C945]/10 transition-colors"
                                  >
                                    <Icon className="text-[#F6C945] text-xs flex-shrink-0" />
                                    <span className="text-white/80 text-xs font-body leading-tight">{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="px-3 pb-3">
                              <Link
                                href="/services"
                                onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                                className="flex items-center justify-center gap-1 text-[#F6C945] text-xs font-body font-medium py-2 border border-[#F6C945]/30 rounded-lg hover:bg-[#F6C945]/10 transition-colors"
                              >
                                View All Services <FaChevronRight className="text-[9px]" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-white/90 hover:text-[#F6C945] font-body font-medium text-base block py-3 border-b border-white/10 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}

                {/* Mobile CTA */}
                <div className="flex flex-col gap-3 pt-4 mt-2">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-white/70 font-body text-sm"
                  >
                    <FaPhone className="text-[#F6C945] text-xs" />
                    {phone}
                  </a>
                  <a
                    href={getWhatsAppUrl(whatsapp, 'Hello! I want to book an event.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#F6C945] hover:bg-[#e6b830] text-[#0d0900] font-semibold px-5 py-3 rounded-full transition-colors font-body text-sm"
                  >
                    <FaWhatsapp />
                    Book via WhatsApp
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
