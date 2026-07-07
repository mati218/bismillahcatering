'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaWhatsapp, FaFacebook, FaInstagram,
  FaYoutube, FaTiktok, FaArrowUp,
} from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import { getWhatsAppUrl } from '@/lib/utils';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Packages', href: '/packages' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Wedding Planning', href: '/services' },
  { label: 'Catering Services', href: '/services' },
  { label: 'Event Decoration', href: '/services' },
  { label: 'Farmhouse Events', href: '/farmhouse' },
  { label: 'Corporate Events', href: '/services' },
  { label: 'Birthday Parties', href: '/services' },
];

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+92-300-0000000';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '923000000000';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@bismillahcatering.com';
  const location = process.env.NEXT_PUBLIC_LOCATION || 'Lahore, Pakistan';
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK || '#';
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || 'https://www.instagram.com/bismillahcaterers.pk/';
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE || '#';
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK || '#';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark text-white" role="contentinfo">
      {/* CTA Banner */}
      <div className="bg-gradient-gold py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4"
          >
            Ready to Plan Your Dream Event?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.1 }}
            className="text-dark/80 font-body text-lg mb-6"
          >
            Contact us today and let us make your event unforgettable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href={getWhatsAppUrl(whatsapp, 'Hello! I want to book an event.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-dark text-white hover:bg-dark/80 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              <FaWhatsapp className="text-lg" /> Book on WhatsApp
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-dark font-semibold px-8 py-3 rounded-full transition-colors backdrop-blur-sm border border-dark/20"
            >
              <FaPhone /> Call Now
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500">
                <Image src="/logo.jpg" alt="Bismillah Catering Logo" fill className="object-cover" />
              </div>
              <div>
                <span className="font-heading text-white text-xl font-bold leading-tight block">Bismillah</span>
                <span className="text-gold-500 text-xs font-body tracking-[0.2em] uppercase">Catering</span>
              </div>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-5">
              Premium catering and complete event management services in Lahore. Making your dream events memorable since 2014.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebook />, href: facebook, label: 'Facebook' },
                { icon: <FaInstagram />, href: instagram, label: 'Instagram' },
                { icon: <FaYoutube />, href: youtube, label: 'YouTube' },
                { icon: <FaTiktok />, href: tiktok, label: 'TikTok' },
                { icon: <FaWhatsapp />, href: getWhatsAppUrl(whatsapp), label: 'WhatsApp' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark flex items-center justify-center text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading text-lg font-semibold text-white mb-5 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-gold-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-500 font-body text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading text-lg font-semibold text-white mb-5 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-gold-500">
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-500 font-body text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading text-lg font-semibold text-white mb-5 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-gold-500">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${phone}`} className="flex items-start gap-3 text-white/60 hover:text-gold-500 transition-colors group">
                  <FaPhone className="mt-1 text-gold-500 flex-shrink-0" />
                  <span className="font-body text-sm">{phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-3 text-white/60 hover:text-gold-500 transition-colors group">
                  <FaEnvelope className="mt-1 text-gold-500 flex-shrink-0" />
                  <span className="font-body text-sm">{email}</span>
                </a>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_GOOGLE_MAP || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/60 hover:text-gold-500 transition-colors group"
                >
                  <FaMapMarkerAlt className="mt-1 text-gold-500 flex-shrink-0" />
                  <span className="font-body text-sm">{location}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(whatsapp, 'Hello!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/60 hover:text-gold-500 transition-colors group"
                >
                  <FaWhatsapp className="mt-1 text-gold-500 flex-shrink-0" />
                  <span className="font-body text-sm">{phone}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 font-body text-sm text-center">
            © {new Date().getFullYear()} Bismillah Catering. All Rights Reserved.
          </p>
          <p className="text-white/40 font-body text-sm">
            Designed with ❤️ in Lahore, Pakistan
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-40 w-10 h-10 bg-gold-500 hover:bg-gold-600 text-dark rounded-full shadow-gold flex items-center justify-center transition-colors"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
}
