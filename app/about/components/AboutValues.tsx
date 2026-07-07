'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaHandshake, FaLeaf } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';

const values = [
  { icon: <FaHeart />, title: 'Passion', description: 'We put heart into every event we create, treating each celebration as our own.' },
  { icon: <FaStar />, title: 'Excellence', description: 'Uncompromising quality in food, decoration, and service — every time.' },
  { icon: <FaHandshake />, title: 'Trust', description: 'Building lasting relationships through honesty, transparency, and reliability.' },
  { icon: <FaLeaf />, title: 'Freshness', description: 'Only the freshest ingredients and latest design trends in every event.' },
];

export default function AboutValues() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="Our Core Values" subtitle="The principles that guide everything we do" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="text-center p-8 bg-white rounded-2xl shadow-card border border-gray-100 hover:border-gold-500/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-500 text-2xl flex items-center justify-center mx-auto mb-5">
                {v.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-dark mb-3">{v.title}</h3>
              <p className="font-body text-dark/60 text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
