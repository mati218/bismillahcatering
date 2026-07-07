'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaImages, FaArrowRight, FaTimes, FaChevronLeft,
  FaChevronRight, FaExpand, FaArrowLeft,
} from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import { galleryItems } from '@/data/gallery';

// Shape used in the homepage lightbox
type PreviewItem = (typeof galleryItems)[number];

// 9 featured items for the homepage grid
const previewItems = galleryItems.filter((item) => item.featured).slice(0, 9);

export default function GalleryPreview() {
  const [lightbox, setLightbox] = useState<{ item: PreviewItem; index: number } | null>(null);

  const openLightbox = (item: PreviewItem, index: number) => setLightbox({ item, index });
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + previewItems.length) % previewItems.length;
    setLightbox({ item: previewItems[next], index: next });
  };

  // Close on Escape / arrow keys
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
  };

  return (
    <>
      <section className="py-24 bg-white" aria-label="Gallery Preview">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Work"
            title="Events We've Crafted"
            subtitle="A glimpse into the magical moments and stunning setups we've created for our clients."
          />

          {/* ── Masonry grid ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            style={{ gridAutoRows: '220px' }}
          >
            {previewItems.map((item, i) => (
              <motion.button
                key={item.id}
                variants={staggerItem}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLightbox(item, i)}
                aria-label={`View ${item.title}`}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  i === 0 ? 'row-span-2 md:row-span-2' : ''
                }`}
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
              >
                {/* Real image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300" />

                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-gold-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-gold-500 text-dark text-[10px] font-semibold px-2.5 py-1 rounded-full font-body uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <FaExpand className="text-white text-[10px]" />
                  </div>
                </div>

                {/* Title + description */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-heading text-white font-semibold text-sm md:text-base translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-body text-white/60 text-xs mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-body font-semibold text-white px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#1A1A1A', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            >
              <FaImages />
              View Full Gallery
              <FaArrowRight className="text-gold-500" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 font-body font-semibold text-dark px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-gold"
              style={{ backgroundColor: '#F6C945' }}
            >
              Book Your Event
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKey}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery — ${lightbox.item.title}`}
          >
            {/* Card */}
            <motion.div
              key={lightbox.item.id}
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-[#0d0900] shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            >
              {/* Image */}
              <div className="relative w-full aspect-video">
                <Image
                  src={lightbox.item.image}
                  alt={lightbox.item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0900] via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gold-500 text-dark text-xs font-semibold px-3 py-1 rounded-full font-body uppercase tracking-wider">
                    {lightbox.item.category}
                  </span>
                </div>

                {/* Counter */}
                <div className="absolute top-4 right-14 bg-black/50 backdrop-blur-sm text-white/60 text-xs font-body px-3 py-1.5 rounded-full">
                  {lightbox.index + 1} / {previewItems.length}
                </div>
              </div>

              {/* Info bar */}
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-white text-xl font-bold leading-tight">
                    {lightbox.item.title}
                  </h3>
                  {lightbox.item.description && (
                    <p className="font-body text-white/50 text-sm mt-1">
                      {lightbox.item.description}
                    </p>
                  )}
                </div>
                <Link
                  href="/gallery"
                  onClick={closeLightbox}
                  className="flex-shrink-0 flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark text-sm font-semibold font-body px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
                >
                  Full Gallery <FaArrowRight className="text-xs" />
                </Link>
              </div>

              {/* Prev arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-gold-500 border border-white/10 hover:border-gold-500 flex items-center justify-center text-white hover:text-dark transition-all duration-200 group/btn"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-sm group-hover/btn:scale-110 transition-transform" />
              </button>

              {/* Next arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-gold-500 border border-white/10 hover:border-gold-500 flex items-center justify-center text-white hover:text-dark transition-all duration-200 group/btn"
                aria-label="Next image"
              >
                <FaChevronRight className="text-sm group-hover/btn:scale-110 transition-transform" />
              </button>
            </motion.div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 border border-white/15 hover:border-gold-500 flex items-center justify-center text-white hover:text-dark transition-all duration-200"
              aria-label="Close gallery"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {previewItems.map((p, i) => (
                <button
                  key={p.id}
                  onClick={(e) => { e.stopPropagation(); setLightbox({ item: p, index: i }); }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === lightbox.index ? 'bg-gold-500 w-5' : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
