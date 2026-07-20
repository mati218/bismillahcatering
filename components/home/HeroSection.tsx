'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaImages, FaChevronDown, FaPhone } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/utils';

export default function HeroSection({ whatsapp, phone }: { whatsapp: string; phone: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ─── Background Layer ─── */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        {/* Deep dark-gold base */}
        <div className="absolute inset-0 bg-[#0d0900]" />
        {/* Radial gold glow spots */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 40%, rgba(246,201,69,0.15) 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 80% 30%, rgba(246,201,69,0.10) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 50% 80%, rgba(246,201,69,0.08) 0%, transparent 70%)
            `,
          }}
        />
        {/* Subtle hero image overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
        </div>
        {/* Final gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </motion.div>

      {/* ─── Animated Decorative Rings ─── */}
      {[
        { size: 500, opacity: 0.04, duration: 20 },
        { size: 350, opacity: 0.07, duration: 15 },
        { size: 200, opacity: 0.10, duration: 10 },
      ].map((ring, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F6C945] z-10 pointer-events-none"
          style={{ width: ring.size, height: ring.size, opacity: ring.opacity }}
          animate={{ rotate: 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* ─── Gold Particles ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#F6C945]"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53 + 10) % 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.1, 0.9, 0.1],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 5 + (i % 5),
              delay: (i % 8) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ─── Main Content ─── */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full pt-24 md:pt-28"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#F6C945]/10 border border-[#F6C945]/40 backdrop-blur-sm text-[#F6C945] text-xs font-semibold tracking-[0.3em] uppercase px-5 py-2.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#F6C945] animate-pulse" />
          Premium Catering & Event Management · Lahore
        </motion.div>

        {/* Logo in hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F6C945] shadow-[0_0_40px_rgba(246,201,69,0.4)] mx-auto mb-6"
        >
          <Image src="/logo.jpg" alt="Bismillah Catering" width={96} height={96} className="object-cover" priority />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1]"
          >
            Making Your
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1]"
            style={{ color: '#F6C945' }}
          >
            Dream Events
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: 0.75, ease: 'easeOut' }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1]"
          >
            Memorable
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="font-accent text-xl md:text-2xl text-white/70 mb-10 font-light italic"
        >
          Luxury Catering &amp; Complete Wedding Planning in Lahore
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <motion.a
            href={getWhatsAppUrl(whatsapp, 'Hello! I want to book an event with Bismillah Catering.')}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, boxShadow: '0 10px 50px rgba(246,201,69,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-2.5 font-body font-semibold text-lg px-10 py-4 rounded-full text-[#1A1A1A] overflow-hidden"
            style={{ backgroundColor: '#F6C945' }}
          >
            <span className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors" />
            <FaWhatsapp className="text-xl relative z-10" />
            <span className="relative z-10">Book Now</span>
          </motion.a>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/gallery"
              className="flex items-center gap-2.5 font-body font-semibold text-lg px-10 py-4 rounded-full text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <FaImages />
              View Gallery
            </Link>
          </motion.div>

          <motion.a
            href={`tel:${phone}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 font-body font-medium text-base px-8 py-4 rounded-full text-white/80 hover:text-[#F6C945] transition-colors"
          >
            <FaPhone className="text-[#F6C945]" />
            {phone}
          </motion.a>
        </motion.div>

        {/* Stats Strip */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 pt-8 border-t border-white/10"
        >
          {[
            { value: '500+', label: 'Events Done' },
            { value: '1000+', label: 'Happy Clients' },
            { value: '10+', label: 'Years Exp.' },
            { value: '100%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#F6C945' }}>
                {stat.value}
              </div>
              <div className="font-body text-white/50 text-xs mt-0.5 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/30 text-[10px] font-body uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#F6C945]"
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>
    </section>
  );
}
