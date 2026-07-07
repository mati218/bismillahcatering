'use client';

import { motion } from 'framer-motion';
import { fadeLeft, fadeRight, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';

export default function AboutStory() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="Our Journey" subtitle="From humble beginnings to becoming Lahore's trusted name in event management" />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {/* Image placeholder */}
            <div className="relative h-96 rounded-3xl bg-gradient-to-br from-gold-500/20 to-dark/20 border-2 border-gold-500/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gold-500/30 font-heading text-4xl font-bold">
                Bismillah
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-4">
            <h3 className="font-heading text-3xl font-bold text-dark mb-4">
              Over <span className="text-gold-500">10 Years</span> of Excellence
            </h3>
            <p className="font-body text-dark/70 leading-relaxed">
              Founded in 2014, Bismillah Catering started with a simple mission: to bring quality food and exceptional service to every event. What began as a small catering business has grown into Lahore&apos;s premier complete event management company.
            </p>
            <p className="font-body text-dark/70 leading-relaxed">
              Today, we handle everything from intimate family gatherings to grand weddings with 1000+ guests. Our team of expert chefs, decorators, planners, and coordinators work together to turn your dreams into reality.
            </p>
            <p className="font-body text-dark/70 leading-relaxed">
              We&apos;ve had the privilege of serving over 500 events and 1000+ satisfied families across Lahore and Pakistan. Every event we create is a testament to our commitment to quality, innovation, and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
