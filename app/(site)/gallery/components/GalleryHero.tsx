'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

export default function GalleryHero() {
  return (
    <section className="relative pt-36 pb-24 bg-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full border border-gold-500 animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full border border-gold-500 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.span variants={fadeUp} initial="hidden" animate="visible" className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 px-5 py-2 rounded-full mb-6">
          Our Work
        </motion.span>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
          Event <span className="text-gold-500">Gallery</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="font-body text-white/70 text-lg max-w-2xl mx-auto">
          A collection of beautiful moments and stunning setups from our recent events.
        </motion.p>
        <motion.nav variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="flex items-center justify-center gap-2 mt-6 font-body text-sm text-white/50">
          <a href="/" className="hover:text-gold-500 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gold-500">Gallery</span>
        </motion.nav>
      </div>
    </section>
  );
}
