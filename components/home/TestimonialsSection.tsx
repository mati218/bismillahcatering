'use client';

import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden" aria-label="Client Testimonials">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gold-500" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-gold-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Real stories from real clients who trusted us with their most special moments."
          light
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/30 rounded-2xl p-7 transition-all duration-400 group relative"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-gold-500/30 text-4xl mb-5 group-hover:text-gold-500/50 transition-colors" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-gold-500 text-sm" />
                ))}
              </div>

              {/* Review */}
              <p className="font-body text-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.review}&rdquo;
              </p>

              {/* Client */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {/* Avatar placeholder */}
                <div className="w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center text-dark font-bold font-heading text-base flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading text-white font-semibold text-sm">{testimonial.name}</h4>
                  <p className="font-body text-white/50 text-xs">{testimonial.location}</p>
                  <p className="font-body text-gold-500 text-xs">{testimonial.event}</p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
