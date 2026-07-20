'use client';

import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import type { getProcessSteps } from '@/lib/data/processSteps';

export default function ProcessSection({ steps }: { steps: Awaited<ReturnType<typeof getProcessSteps>> }) {
  return (
    <section className="py-24 bg-white" aria-label="Our Process">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="How It Works"
          title="Simple 4-Step Process"
          subtitle="From inquiry to your perfect event — we make it seamless and stress-free."
        />

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-gold-500/20 via-gold-500 to-gold-500/20 z-0" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, i) => {
              const Icon = FaIcons[step.icon as keyof typeof FaIcons] || FaIcons.FaStar;
              return (
                <motion.div
                  key={step.id}
                  variants={staggerItem}
                  className="text-center group"
                >
                  {/* Step Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative w-32 h-32 mx-auto mb-6"
                  >
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/30 group-hover:border-gold-500 transition-colors duration-300" />
                    {/* Inner circle */}
                    <div
                      className="absolute inset-3 rounded-full flex items-center justify-center text-2xl text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark text-gold-500 font-heading font-bold text-xs flex items-center justify-center border-2 border-gold-500">
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Arrow for mobile */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden text-gold-500/50 text-2xl mb-4">↓</div>
                  )}

                  <h3 className="font-heading text-xl font-bold text-dark mb-3">{step.title}</h3>
                  <p className="font-body text-dark/60 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
