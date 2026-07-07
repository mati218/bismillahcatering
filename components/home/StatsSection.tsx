'use client';

import { motion } from 'framer-motion';
import { useCounter } from '@/hooks/useCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import { FaTrophy, FaSmile, FaAward, FaStar } from 'react-icons/fa';
import type { ReactNode } from 'react';

interface Stat {
  end: number;
  suffix: string;
  label: string;
  description: string;
  icon: ReactNode;
}

const stats: Stat[] = [
  {
    end: 500,
    suffix: '+',
    label: 'Events Completed',
    description: 'Successful events across Lahore & Pakistan',
    icon: <FaTrophy />,
  },
  {
    end: 1000,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Satisfied families who trusted us with their celebrations',
    icon: <FaSmile />,
  },
  {
    end: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'A decade of excellence in catering & event management',
    icon: <FaAward />,
  },
  {
    end: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Our commitment to perfection, every single time',
    icon: <FaStar />,
  },
];

/* ── Individual stat card ── */
function StatCard({
  end,
  suffix,
  label,
  description,
  icon,
  triggered,
  index,
}: Stat & { triggered: boolean; index: number }) {
  const count = useCounter(end, 2000, 0, triggered);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col items-center text-center px-6 py-10 rounded-3xl border border-white/8 bg-white/4 hover:bg-white/7 hover:border-gold-500/30 transition-all duration-500 overflow-hidden"
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(246,201,69,0.08) 0%, transparent 70%)' }}
      />

      {/* Top gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gold-500/10 group-hover:bg-gold-500/18 border border-gold-500/20 group-hover:border-gold-500/40 flex items-center justify-center text-gold-500 text-lg transition-all duration-400">
          {icon}
        </div>
        {/* Subtle glow behind icon */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ boxShadow: '0 0 24px rgba(246,201,69,0.2)' }}
        />
      </div>

      {/* Animated counter */}
      <div className="font-heading font-bold text-gold-500 mb-1 leading-none tabular-nums"
        style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}
      >
        {count.toLocaleString()}{suffix}
      </div>

      {/* Label */}
      <h3 className="font-heading text-white font-semibold mb-3 tracking-wide"
        style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}
      >
        {label}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-gold-500/40 mb-3" />

      {/* Description */}
      <p className="font-body text-white/50 group-hover:text-white/65 leading-relaxed transition-colors duration-300"
        style={{ fontSize: 'clamp(0.72rem, 0.9vw, 0.8rem)' }}
      >
        {description}
      </p>

      {/* Vertical separator — hidden on last card */}
      {index < stats.length - 1 && (
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/8" />
      )}
    </motion.div>
  );
}

/* ── Section ── */
export default function StatsSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.25 });

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d0900 0%, #1a0f00 45%, #0d0900 100%)' }}
      aria-label="Our Achievements"
    >
      {/* ── Decorative background rings ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Large outer ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-500/4" />
        {/* Mid ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-gold-500/6" />
        {/* Inner ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold-500/8" />
        {/* Gold glow blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(246,201,69,0.06) 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(246,201,69,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.3em] uppercase px-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/8 text-gold-500 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            Our Achievements
          </span>

          <h2 className="font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            Trusted by Thousands of{' '}
            <span className="text-gradient-gold">Families</span>
          </h2>

          <p className="font-body text-white/50 max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)' }}
          >
            Over a decade of crafting unforgettable events — the numbers speak for themselves.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gold-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <div className="h-px w-10 bg-gold-500" />
          </div>
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4  lg:divide-x lg:divide-white/6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} triggered={isVisible} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
