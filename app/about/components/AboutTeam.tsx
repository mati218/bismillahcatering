'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';

const team = [
  { name: 'Muhammad Bilal', role: 'Head Chef & Founder', description: '15+ years in culinary arts', initial: 'B' },
  { name: 'Ahmed Raza', role: 'Event Manager', description: 'Expert in complete event coordination', initial: 'A' },
  { name: 'Fatima Khan', role: 'Decoration Head', description: 'Award-winning decoration specialist', initial: 'F' },
  { name: 'Usman Sheikh', role: 'Operations Manager', description: 'Ensuring flawless execution', initial: 'U' },
];

export default function AboutTeam() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <SectionHeader title="Meet Our Team" subtitle="The talented professionals behind every memorable event" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 text-center shadow-card border border-gray-100 hover:border-gold-500/30 transition-all duration-300 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-dark font-heading font-bold text-2xl mx-auto mb-5 group-hover:scale-110 transition-transform">
                {member.initial}
              </div>
              <h3 className="font-heading text-lg font-bold text-dark mb-1">{member.name}</h3>
              <p className="font-body text-gold-600 text-sm font-semibold mb-2">{member.role}</p>
              <p className="font-body text-dark/60 text-xs">{member.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
