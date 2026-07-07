'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes, FaExpand, FaChevronLeft,
  FaChevronRight, FaImages, FaCalendarAlt,
} from 'react-icons/fa';
import { galleryEvents, galleryCategories, type GalleryCategory, type GalleryEvent } from '@/data/gallery';

/* ── types ── */
interface LightboxState {
  event: GalleryEvent;
  imageIndex: number;
}

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  /* filtered event list */
  const filtered =
    activeCategory === 'all'
      ? galleryEvents
      : galleryEvents.filter((e) => e.category === activeCategory);

  /* open lightbox at first image of event */
  const openLightbox = (event: GalleryEvent, imageIndex = 0) =>
    setLightbox({ event, imageIndex });

  const closeLightbox = () => setLightbox(null);

  /* navigate within event images */
  const prevImage = useCallback(() => {
    if (!lightbox) return;
    const total = lightbox.event.images.length;
    setLightbox({ ...lightbox, imageIndex: (lightbox.imageIndex - 1 + total) % total });
  }, [lightbox]);

  const nextImage = useCallback(() => {
    if (!lightbox) return;
    const total = lightbox.event.images.length;
    setLightbox({ ...lightbox, imageIndex: (lightbox.imageIndex + 1) % total });
  }, [lightbox]);

  /* keyboard navigation */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   prevImage();
      if (e.key === 'ArrowRight')  nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prevImage, nextImage]);

  const currentImage = lightbox?.event.images[lightbox.imageIndex];

  return (
    <>
      {/* ════════════════════════════
          SECTION
      ════════════════════════════ */}
      <section className="py-20 bg-[#FAFAFA]" aria-label="Full Gallery">
        <div className="container mx-auto px-4">

          {/* ── Category filter pills ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'bg-gold-500 text-dark shadow-gold'
                    : 'bg-white text-dark/60 hover:text-dark border border-gray-200 hover:border-gold-500/40'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* ── Event grid ── */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.28 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-[0_16px_48px_rgba(0,0,0,0.14)] border border-transparent hover:border-gold-500/25 transition-all duration-400 flex flex-col"
                >
                  {/* Cover image */}
                  <button
                    onClick={() => openLightbox(event, 0)}
                    aria-label={`Open gallery for ${event.title}`}
                    className="relative w-full aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <Image
                      src={event.cover}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-600 group-hover:scale-108"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300" />

                    {/* Image count badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-body font-semibold px-2.5 py-1.5 rounded-full border border-white/15">
                      <FaImages className="text-gold-500 text-[10px]" />
                      {event.images.length} photos
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold-500 text-dark text-[10px] font-semibold px-2.5 py-1 rounded-full font-body uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>

                    {/* Expand icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-gold-500/90 backdrop-blur-sm flex items-center justify-center shadow-gold scale-75 group-hover:scale-100 transition-transform duration-300">
                        <FaExpand className="text-dark text-sm" />
                      </div>
                    </div>
                  </button>

                  {/* Card footer */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-heading text-dark font-bold text-sm leading-snug mb-1 group-hover:text-gold-600 transition-colors duration-200">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="font-body text-dark/50 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      {/* Date */}
                      {event.date && (
                        <span className="flex items-center gap-1.5 text-dark/40 text-xs font-body">
                          <FaCalendarAlt className="text-gold-500 text-[10px]" />
                          {event.date}
                        </span>
                      )}

                      {/* Thumbnail strip — first 3 images */}
                      <div className="flex -space-x-2">
                        {event.images.slice(0, 3).map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => openLightbox(event, idx)}
                            aria-label={`View photo ${idx + 1} of ${event.title}`}
                            className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white hover:border-gold-500 transition-colors duration-200 focus:outline-none"
                          >
                            <Image
                              src={img.src}
                              alt={img.caption || event.title}
                              fill
                              sizes="28px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                        {event.images.length > 3 && (
                          <button
                            onClick={() => openLightbox(event, 3)}
                            aria-label={`View all ${event.images.length} photos`}
                            className="w-7 h-7 rounded-full bg-gold-500 border-2 border-white flex items-center justify-center focus:outline-none hover:bg-gold-600 transition-colors"
                          >
                            <span className="text-dark text-[9px] font-bold font-body">
                              +{event.images.length - 3}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-dark/40 font-body">
              No events found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════
          LIGHTBOX
      ════════════════════════════ */}
      <AnimatePresence>
        {lightbox && currentImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[300] bg-black/96 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.event.title} — photo ${lightbox.imageIndex + 1} of ${lightbox.event.images.length}`}
          >
            {/* ── Main image ── */}
            <motion.div
              key={`${lightbox.event.id}-${lightbox.imageIndex}`}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-[#0d0900] shadow-[0_32px_80px_rgba(0,0,0,0.9)] flex flex-col"
              style={{ maxHeight: 'calc(100vh - 160px)' }}
            >
              {/* Image area */}
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={currentImage.src}
                  alt={currentImage.caption || lightbox.event.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />

                {/* Gradient fade at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0900]/90 via-transparent to-transparent pointer-events-none" />

                {/* Top-left: event title + category */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="bg-gold-500 text-dark text-[10px] font-semibold px-2.5 py-1 rounded-full font-body uppercase tracking-wider">
                    {lightbox.event.category}
                  </span>
                  <span className="text-white/70 font-body text-xs hidden sm:block">
                    {lightbox.event.title}
                  </span>
                </div>

                {/* Top-right: counter */}
                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white/70 text-xs font-body font-semibold px-3 py-1.5 rounded-full border border-white/10">
                  {lightbox.imageIndex + 1} / {lightbox.event.images.length}
                </div>

                {/* Prev arrow */}
                {lightbox.event.images.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/55 hover:bg-gold-500 border border-white/10 hover:border-gold-500 flex items-center justify-center text-white hover:text-dark transition-all duration-200"
                    aria-label="Previous photo"
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>
                )}

                {/* Next arrow */}
                {lightbox.event.images.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/55 hover:bg-gold-500 border border-white/10 hover:border-gold-500 flex items-center justify-center text-white hover:text-dark transition-all duration-200"
                    aria-label="Next photo"
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                )}
              </div>

              {/* ── Caption + thumbnail strip ── */}
              <div className="px-5 pt-4 pb-5" onClick={(e) => e.stopPropagation()}>
                {/* Caption */}
                {currentImage.caption && (
                  <p className="font-body text-white/60 text-sm mb-4 text-center">
                    {currentImage.caption}
                  </p>
                )}

                {/* Thumbnail strip */}
                {lightbox.event.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 justify-center scrollbar-hide">
                    {lightbox.event.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightbox({ ...lightbox, imageIndex: idx })}
                        aria-label={`Go to photo ${idx + 1}`}
                        className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          idx === lightbox.imageIndex
                            ? 'border-gold-500 shadow-[0_0_10px_rgba(246,201,69,0.5)]'
                            : 'border-transparent opacity-50 hover:opacity-80 hover:border-white/30'
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.caption || `Photo ${idx + 1}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Close button ── */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 border border-white/15 hover:border-gold-500 flex items-center justify-center text-white hover:text-dark transition-all duration-200"
              aria-label="Close gallery"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* ── Dot indicators below image ── */}
            {lightbox.event.images.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                {lightbox.event.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, imageIndex: idx }); }}
                    aria-label={`Photo ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      idx === lightbox.imageIndex
                        ? 'bg-gold-500 w-5'
                        : 'bg-white/30 hover:bg-white/60 w-1.5'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
