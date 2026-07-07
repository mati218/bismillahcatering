'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/animations';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
  light = false,
  className = '',
}: SectionHeaderProps) {
  const titleColor = light ? 'text-white' : 'text-[#1A1A1A]';
  const subtitleColor = light ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.6)';
  const badgeBg = light ? 'rgba(246,201,69,0.1)' : 'rgba(246,201,69,0.08)';
  const badgeBorder = 'rgba(246,201,69,0.3)';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className={`mb-14 ${center ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <motion.span
          variants={fadeUp}
          className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-4 border"
          style={{
            backgroundColor: badgeBg,
            color: '#F6C945',
            borderColor: badgeBorder,
          }}
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className={`font-heading font-bold leading-tight text-3xl md:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`font-body text-base md:text-lg mt-4 leading-relaxed ${center ? 'max-w-2xl mx-auto' : ''}`}
          style={{ color: subtitleColor }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative divider */}
      <motion.div
        variants={fadeUp}
        className={`flex items-center gap-3 mt-5 ${center ? 'justify-center' : ''}`}
      >
        <div className="h-px w-10" style={{ backgroundColor: '#F6C945' }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F6C945' }} />
        <div className="h-px w-10" style={{ backgroundColor: '#F6C945' }} />
      </motion.div>
    </motion.div>
  );
}
