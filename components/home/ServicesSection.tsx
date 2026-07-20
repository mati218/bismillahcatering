'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaRing, FaUtensils, FaStar, FaHome, FaBriefcase,
  FaBirthdayCake, FaTheaterMasks, FaPalette, FaCrown,
  FaGem, FaTruck, FaFire, FaMosque, FaHeart, FaBook,
  FaConciergeBell
} from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import type { getServices } from '@/lib/data/services';

const iconMap: Record<string, React.ReactNode> = {
  FaRing: <FaRing />,
  FaUtensils: <FaUtensils />,
  FaStar: <FaStar />,
  FaHome: <FaHome />,
  FaBriefcase: <FaBriefcase />,
  FaBirthdayCake: <FaBirthdayCake />,
  FaTheaterMasks: <FaTheaterMasks />,
  FaPalette: <FaPalette />,
  FaCrown: <FaCrown />,
  FaGem: <FaGem />,
  FaTruck: <FaTruck />,
  FaFire: <FaFire />,
  FaMosque: <FaMosque />,
  FaHeart: <FaHeart />,
  FaBook: <FaBook />,
  FaConciergeBell: <FaConciergeBell />,
};

export default function ServicesSection({ services }: { services: Awaited<ReturnType<typeof getServices>> }) {
  // Show only first 12 services on homepage
  const featuredServices = services.slice(0, 12);

  return (
    <section className="py-24 bg-[#FAFAFA]" aria-label="Our Services">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="What We Offer"
          title="Complete Event Solutions"
          subtitle="From intimate gatherings to grand weddings — we handle every detail with passion and professionalism."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {featuredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
              className="bg-white rounded-2xl p-7 shadow-card border border-transparent hover:border-gold-500/30 transition-all duration-400 group relative overflow-hidden cursor-pointer"
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 rounded-bl-[40px] group-hover:bg-gold-500/10 transition-colors" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 group-hover:bg-gold-500 text-gold-500 group-hover:text-dark flex items-center justify-center text-2xl mb-5 transition-all duration-300">
                {iconMap[service.icon] || <FaStar />}
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg font-bold text-dark mb-2 group-hover:text-gold-600 transition-colors">
                {service.title}
              </h3>
              <p className="font-body text-dark/60 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5">
                {service.features.slice(0, 3).map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs font-body text-dark/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-gold hover:shadow-gold-lg"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
