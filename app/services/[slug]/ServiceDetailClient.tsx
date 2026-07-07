'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp, FaPhone, FaChevronRight, FaCheck,
  FaRing, FaUtensils, FaStar, FaHome, FaBriefcase,
  FaBirthdayCake, FaPalette, FaCrown, FaGem, FaTruck,
  FaFire, FaMosque, FaHeart, FaBook, FaConciergeBell,
  FaCalendar, FaUsers, FaHandshake, FaCamera,
  FaClock, FaShieldAlt, FaRoute, FaVolumeUp,
  FaListAlt, FaMapMarked, FaLightbulb,
} from 'react-icons/fa';
import { GiTheaterCurtains } from 'react-icons/gi';
import type { Service } from '@/data/services';
import { getWhatsAppUrl } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  FaRing, FaUtensils, FaStar, FaHome, FaBriefcase, FaBirthdayCake,
  FaTheaterMasks: GiTheaterCurtains, FaPalette, FaCrown, FaGem, FaTruck,
  FaFire, FaMosque, FaHeart, FaBook, FaConciergeBell, FaCalendar,
  FaUsers, FaHandshake, FaCamera, FaClock, FaShieldAlt, FaRoute,
  FaVolumeUp, FaListAlt, FaMapMarked, FaLightbulb,
  FaFlower: FaStar, FaRuler: FaListAlt, FaArchway: FaCrown,
  FaPaintBrush: FaPalette, FaChair: FaHome, FaTree: FaHome,
  FaMoon: FaStar, FaMicrophone: FaVolumeUp, FaHatChef: FaUtensils,
  FaDrumstickBite: FaFire, FaUmbrella: FaHome, FaSeedling: FaStar,
  FaCouch: FaHome, FaBalloon: FaStar, FaMagic: FaStar, FaLeaf: FaStar,
  FaWineGlass: FaGem, FaHorse: FaHome, FaFlower2: FaStar,
};

interface Props {
  service: Service;
  related: Service[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ServiceDetailClient({ service, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '923000000000';
  const phone = process.env.NEXT_PUBLIC_PHONE || '+92-300-0000000';

  const ServiceIcon = iconMap[service.icon] || FaStar;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#0d0900]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={service.gallery[0]?.src || service.image}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0900] via-[#0d0900]/60 to-[#0d0900]/30" />
        </div>

        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-10 w-64 h-64 rounded-full border border-[#F6C945]/10 -translate-y-1/2" />
          <div className="absolute top-1/2 right-10 w-40 h-40 rounded-full border border-[#F6C945]/15 -translate-y-1/2" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-16 pt-36">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/40 text-sm font-body mb-6"
          >
            <Link href="/" className="hover:text-[#F6C945] transition-colors">Home</Link>
            <FaChevronRight className="text-xs" />
            <Link href="/services" className="hover:text-[#F6C945] transition-colors">Services</Link>
            <FaChevronRight className="text-xs" />
            <span className="text-[#F6C945]">{service.title}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-[#F6C945]/10 border border-[#F6C945]/30 text-[#F6C945] text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-4"
              >
                <ServiceIcon />
                {service.title}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-body text-white/60 text-lg max-w-2xl"
              >
                {service.description}
              </motion.p>
            </div>

            {/* Price + CTA */}
            {service.startingPrice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex-shrink-0 bg-[#F6C945]/10 border border-[#F6C945]/30 backdrop-blur-sm rounded-2xl p-5 text-center min-w-[180px]"
              >
                <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-1">Starting from</p>
                <p className="text-[#F6C945] font-heading text-2xl font-bold">{service.startingPrice}</p>
                <a
                  href={getWhatsAppUrl(whatsapp, `Hello! I'm interested in your ${service.title} service. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 bg-[#F6C945] hover:bg-[#e6b830] text-[#0d0900] text-sm font-semibold px-4 py-2 rounded-xl transition-colors font-body"
                >
                  <FaWhatsapp />
                  Book Now
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-[#F6C945] text-xs font-semibold tracking-[0.3em] uppercase font-body mb-2">
              Gallery
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-10">
              See Our Work
            </motion.h2>
          </motion.div>

          {/* Main image */}
          <div
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-zoom-in mb-4 bg-[#0d0900]"
            onClick={() => setLightboxOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={service.gallery[activeImage]?.src || service.image}
                  alt={service.gallery[activeImage]?.alt || service.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-body px-3 py-1.5 rounded-full">
              {activeImage + 1} / {service.gallery.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-3">
            {service.gallery.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveImage(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  activeImage === i ? 'border-[#F6C945] shadow-[0_0_16px_rgba(246,201,69,0.4)]' : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={service.gallery[activeImage]?.src || service.image}
                alt={service.gallery[activeImage]?.alt || service.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-light transition-colors"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── About + Features ── */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Description */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} className="text-[#F6C945] text-xs font-semibold tracking-[0.3em] uppercase font-body mb-2">
                About This Service
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                What's Included
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
                {service.longDescription}
              </motion.p>

              {/* Features list */}
              <motion.ul variants={stagger} className="space-y-3">
                {service.features.map((feat) => (
                  <motion.li key={feat} variants={fadeUp} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F6C945] flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-[#0d0900] text-[10px]" />
                    </div>
                    <span className="font-body text-[#1A1A1A]/80 font-medium">{feat}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Ideal for */}
              <motion.div variants={fadeUp} className="mt-8">
                <p className="font-body text-sm font-semibold text-[#1A1A1A]/50 uppercase tracking-widest mb-3">
                  Ideal for
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.idealFor.map((item) => (
                    <span
                      key={item}
                      className="font-body text-sm bg-[#F6C945]/10 border border-[#F6C945]/30 text-[#1A1A1A]/70 px-3 py-1.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Highlights grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {service.highlights.map((h, i) => {
                const HIcon = iconMap[h.icon] || FaStar;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-[#F6C945]/10 hover:border-[#F6C945]/40 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F6C945]/10 group-hover:bg-[#F6C945] flex items-center justify-center text-[#F6C945] group-hover:text-[#0d0900] transition-all duration-300 mb-3 text-sm">
                      <HIcon />
                    </div>
                    <h4 className="font-heading text-sm font-bold text-[#1A1A1A] mb-1">{h.title}</h4>
                    <p className="font-body text-[#1A1A1A]/55 text-xs leading-relaxed">{h.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0900 0%, #1a0f00 50%, #0d0900 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#F6C945]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#F6C945]/8" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ServiceIcon className="text-[#F6C945] text-4xl mx-auto mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book {service.title}?
            </h2>
            <p className="font-body text-white/60 text-lg mb-8">
              Get in touch today for a free consultation and customised quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={getWhatsAppUrl(whatsapp, `Hello! I want to book ${service.title}. Please share details and pricing.`)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-[#F6C945] hover:bg-[#e6b830] text-[#0d0900] font-semibold px-8 py-4 rounded-full transition-colors font-body shadow-[0_4px_24px_rgba(246,201,69,0.4)]"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </motion.a>
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2.5 border border-white/20 text-white hover:border-[#F6C945] hover:text-[#F6C945] font-body font-medium px-8 py-4 rounded-full transition-colors"
              >
                <FaPhone />
                {phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[#F6C945] text-xs font-semibold tracking-[0.3em] uppercase font-body mb-2">
              Explore More
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A1A]">Related Services</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel, i) => {
              const RelIcon = iconMap[rel.icon] || FaStar;
              return (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/services/${rel.slug}`}
                    className="group block bg-[#FAFAFA] hover:bg-white border border-transparent hover:border-[#F6C945]/30 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4">
                      <Image src={rel.image} alt={rel.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F6C945]/10 group-hover:bg-[#F6C945] flex items-center justify-center text-[#F6C945] group-hover:text-[#0d0900] transition-all duration-300 text-xs">
                        <RelIcon />
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#1A1A1A] group-hover:text-[#c9a227] transition-colors">
                        {rel.title}
                      </h3>
                    </div>
                    <p className="font-body text-[#1A1A1A]/55 text-sm leading-relaxed line-clamp-2">{rel.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#F6C945] text-sm font-semibold font-body mt-3 group-hover:gap-2 transition-all">
                      Learn More <FaChevronRight className="text-xs" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-[#F6C945]/40 hover:bg-[#F6C945] hover:text-[#0d0900] text-[#F6C945] font-body font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              View All Services <FaChevronRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
