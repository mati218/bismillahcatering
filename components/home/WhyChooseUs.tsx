'use client';

import { motion } from 'framer-motion';
import {
  FaLeaf, FaUsers, FaTag, FaGem, FaUserTie, FaClock,
  FaHeart, FaHome
} from 'react-icons/fa';
import { staggerContainer, staggerItem, fadeLeft, fadeRight, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';

const reasons = [
  {
    icon: <FaLeaf />,
    title: 'Fresh Food Always',
    description: 'We use only the freshest ingredients, prepared on the day of your event for maximum taste and quality.',
    color: '#22c55e',
  },
  {
    icon: <FaUsers />,
    title: 'Professional Team',
    description: 'Our trained team of chefs, decorators, and managers ensures flawless execution of every event.',
    color: '#3b82f6',
  },
  {
    icon: <FaTag />,
    title: 'Affordable Packages',
    description: 'Premium quality at competitive prices. Customizable packages to fit every budget without compromise.',
    color: '#f59e0b',
  },
  {
    icon: <FaGem />,
    title: 'Luxury Decoration',
    description: 'World-class décor with premium materials, floral arrangements, and lighting that transforms any venue.',
    color: '#8b5cf6',
  },
  {
    icon: <FaUserTie />,
    title: 'Experienced Staff',
    description: 'Over 10 years of experience with a dedicated team that has mastered the art of event management.',
    color: '#ec4899',
  },
  {
    icon: <FaClock />,
    title: 'On-Time Service',
    description: 'We believe punctuality is key. Every setup, service, and delivery is completed on schedule.',
    color: '#14b8a6',
  },
  {
    icon: <FaHeart />,
    title: 'Complete Wedding Planning',
    description: 'From engagement to walima — we manage every ceremony with care, love, and attention to detail.',
    color: '#ef4444',
  },
  {
    icon: <FaHome />,
    title: 'Farmhouse Management',
    description: 'Expert farmhouse event coordination with full outdoor setup, décor, and catering services.',
    color: '#f97316',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden" aria-label="Why Choose Bismillah Catering">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold-500/5 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Why Trust Us"
          title="The Bismillah Difference"
          subtitle="We don't just provide catering — we create experiences that become cherished memories."
          light
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/40 rounded-2xl p-6 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${reason.color}20`, color: reason.color }}
                >
                  {reason.icon}
                </div>
                <h3 className="font-heading text-white font-semibold mb-2">{reason.title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Visual Feature */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/5 rounded-3xl p-10 border border-gold-500/20 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-bl-[80px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-tr-[80px]" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center mb-6">
                  <FaGem className="text-dark text-2xl" />
                </div>

                <h3 className="font-heading text-3xl font-bold text-white mb-4">
                  10+ Years of <span className="text-gold-500">Excellence</span>
                </h3>

                <p className="font-body text-white/70 text-base leading-relaxed mb-8">
                  Since 2014, Bismillah Catering has been the go-to choice for weddings, corporate events, and private parties across Lahore. Our commitment to quality and service has earned us the trust of over 1000 families.
                </p>

                {/* Achievement List */}
                <ul className="space-y-4">
                  {[
                    'Certified professional chefs & decorators',
                    'Premium equipment & luxury furniture',
                    'Complete event management under one roof',
                    '24/7 customer support & coordination',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-white/80 text-sm">
                      <span className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
