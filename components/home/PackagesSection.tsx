'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/common/SectionHeader';
import type { getPackages } from '@/lib/data/packages';
import { getWhatsAppUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PackagesSectionProps {
  packages: Awaited<ReturnType<typeof getPackages>>;
  whatsapp: string;
}

export default function PackagesSection({ packages, whatsapp }: PackagesSectionProps) {
  return (
    <section className="py-24 bg-[#FAFAFA]" aria-label="Wedding Packages">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Packages"
          title="Choose Your Perfect Package"
          subtitle="Transparent pricing with premium quality. Every package can be customized to your needs."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className={cn(
                'relative rounded-3xl overflow-hidden border transition-all duration-400',
                pkg.featured
                  ? 'bg-dark border-gold-500 shadow-gold-lg scale-105'
                  : 'bg-white border-gray-200 shadow-card hover:border-gold-500/40'
              )}
            >
              {/* Featured Badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gold-500 text-dark text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div
                className={cn(
                  'p-7 relative overflow-hidden',
                  pkg.featured ? 'bg-gradient-gold' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                )}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20"
                  style={{ backgroundColor: pkg.color }}
                />
                <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-2 block opacity-70">
                  {pkg.tagline}
                </span>
                <h3
                  className={cn(
                    'font-heading text-2xl font-bold mb-1',
                    pkg.featured ? 'text-dark' : 'text-dark'
                  )}
                >
                  {pkg.name}
                </h3>
                <div className={cn('mt-3', pkg.featured ? 'text-dark' : 'text-dark')}>
                  <span className="font-body text-xs opacity-70">{pkg.priceNote}</span>
                  <div className="font-heading text-xl font-bold">{pkg.price}</div>
                </div>
              </div>

              {/* Features */}
              <div className="p-7">
                <ul className="space-y-3 mb-7">
                  {pkg.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <FaCheck className="text-gold-500 flex-shrink-0" />
                      ) : (
                        <FaTimes className={cn('flex-shrink-0', pkg.featured ? 'text-white/30' : 'text-gray-300')} />
                      )}
                      <span
                        className={cn(
                          'font-body text-sm',
                          feature.included
                            ? pkg.featured ? 'text-white' : 'text-dark'
                            : pkg.featured ? 'text-white/30' : 'text-gray-400'
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={getWhatsAppUrl(whatsapp, `Hello! I am interested in the ${pkg.name} package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300',
                    pkg.featured
                      ? 'bg-gold-500 hover:bg-gold-600 text-dark shadow-gold'
                      : 'bg-dark hover:bg-dark/80 text-white'
                  )}
                >
                  <FaWhatsapp />
                  Book This Package
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="text-center text-dark/50 font-body text-sm mt-8"
        >
          * All packages are customizable. Contact us for a personalized quote.
        </motion.p>
      </div>
    </section>
  );
}
