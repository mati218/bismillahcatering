'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaRing, FaUtensils, FaStar, FaHome, FaBriefcase, FaBirthdayCake,
  FaTheaterMasks, FaPalette, FaCrown, FaGem, FaTruck, FaFire,
  FaMosque, FaHeart, FaBook, FaConciergeBell, FaChevronRight,
} from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import { services } from '@/data/services';

const iconMap: Record<string, React.ReactNode> = {
  FaRing: <FaRing />, FaUtensils: <FaUtensils />, FaStar: <FaStar />,
  FaHome: <FaHome />, FaBriefcase: <FaBriefcase />, FaBirthdayCake: <FaBirthdayCake />,
  FaTheaterMasks: <FaTheaterMasks />, FaPalette: <FaPalette />, FaCrown: <FaCrown />,
  FaGem: <FaGem />, FaTruck: <FaTruck />, FaFire: <FaFire />,
  FaMosque: <FaMosque />, FaHeart: <FaHeart />, FaBook: <FaBook />,
  FaConciergeBell: <FaConciergeBell />,
};

export default function ServicesGrid() {
  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
              className="bg-white rounded-2xl shadow-sm border border-transparent hover:border-[#F6C945]/30 transition-all duration-300 group relative overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-[#F6C945] flex items-center justify-center text-[#0d0900] text-sm shadow-lg">
                  {iconMap[service.icon] || <FaStar />}
                </div>
                {service.startingPrice && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-[#F6C945] text-[10px] font-body font-semibold px-2.5 py-1 rounded-full">
                    From {service.startingPrice}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-base font-bold text-[#1A1A1A] mb-1.5 group-hover:text-[#c9a227] transition-colors">
                  {service.title}
                </h3>
                <p className="font-body text-[#1A1A1A]/55 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1 mb-4">
                  {service.features.slice(0, 3).map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs font-body text-[#1A1A1A]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F6C945] flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-[#F6C945] hover:text-[#c9a227] font-body text-sm font-semibold transition-colors group/link mt-auto"
                >
                  View Details
                  <FaChevronRight className="text-[10px] group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F6C945] to-[#e6b830] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
