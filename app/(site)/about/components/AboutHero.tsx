'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/animations';

export default function AboutHero() {
  return (
    <section className="relative pt-36 pb-24 bg-dark overflow-hidden" aria-label="About Hero">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gold-500 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-gold-500 animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 px-5 py-2 rounded-full mb-6"
        >
          Our Story
        </motion.span>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl font-bold text-white mb-4"
        >
          About <span className="text-gold-500">Bismillah</span> Catering
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="font-body text-white/70 text-lg max-w-2xl mx-auto"
        >
          A decade of crafting unforgettable events with passion, dedication, and unmatched professionalism.
        </motion.p>
        {/* Breadcrumb */}
        <motion.nav
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 mt-6 font-body text-sm text-white/50"
        >
          <a href="/" className="hover:text-gold-500 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gold-500">About</span>
        </motion.nav>
      </div>
    </section>
  );
}
